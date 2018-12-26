import React from 'react'
import { createStackNavigator, createAppContainer } from "react-navigation"
import ChannelsContainer from './Channels/ChannelsContainer';
import ChatContainer from './Chat/ChatContainer';
import UserBoardContainer from './UserBoard/UserBoardContainer'
import { isNewMessagePayload } from '@mitter-io/core'
export const MyContext = React.createContext();

const AppNavigator = createStackNavigator({
    UserBoard: {
        screen: UserBoardContainer,
        navigationOptions: {
            title: 'User List'
        }
    },
    Channels: {
        screen: ChannelsContainer,
        navigationOptions: {
            title: 'Your Channels',
        }
    },
    Chat: {
        screen: ChatContainer,
        navigationOptions: ({ navigation }) => ({
            title: `${navigation.state.params.channelId}`
        })
    },
    initialRoute: 'UserBoard'
});

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            channels: [],
            messages: {}   // {[key: channelId]: Message[]}
        }
        const mitter = this.props.mitter
        mitter.subscribeToPayload((payload) => {
            if (isNewMessagePayload(payload)) {
                this.addMessageToChannel(payload.channelId.identifier, payload.message)
            }
        })
    }

    addMessageToChannel = (channelId, message) => {
        const messages = { ... this.state.messages }
        if (channelId in messages) {
            messages[channelId].push(message)
        }
        else {
            messages[channelId] = []
        }
        this.setState({ messages: messages })
    }

    getParticipatedChannels = () => {
        const mitter = this.props.mitter
        mitter.clients().channels().participatedChannels()
            .then(res => {
                this.setState({ channels: res })
            }
            )
            .catch(res => console.log('error in fetching channels', res))
    }

    getMessagesForChannel = (channelId) => {
        const mitter = this.props.mitter
        mitter.clients().messages().getMessages(channelId)
            .then(res => {
                const messages = { ...this.state.messages }
                messages[channelId] = res.reverse()
                this.setState({ messages: messages })
            }
            )
            .catch(res => console.log('error in fetching messages', res))
    }

    sendMessage = (text, channelId) => {
        const mitter = this.props.mitter
        const message = {
            senderId: mitter.me(),
            textPayload: text,
            timelineEvents: [
                {
                    type: "mitter.mtet.SentTime",
                    eventTimeMs: new Date().getTime(),
                    subject: mitter.me()
                }
            ]
        }

        mitter.clients().messages().sendMessage(channelId, message)
            .then(res => {
                console.log('message successfully sent', res)
            })
            .catch(res => {
                console.log('error in sending message', res)
            })

    }

    setAuthorization = (mitterUserAuthToken) => {
        const mitter = this.props.mitter
        mitter.setUserAuthorization(mitterUserAuthToken)
    }

    render() {
        const mitter = this.props.mitter
        return (
            <MyContext.Provider value={
                {
                    setAuthorization: this.setAuthorization,
                    getParticipatedChannels: this.getParticipatedChannels,
                    getMessagesForChannel: this.getMessagesForChannel,
                    sendMessage: this.sendMessage,
                    channels: this.state.channels,
                    messages: this.state.messages,
                    userId: mitter.me().identifier
                }
            }
            >
                <AppContainer />
            </MyContext.Provider>
        )
    }
}