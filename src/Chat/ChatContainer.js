import React from 'react'
import Chat from './Chat'
import { MyContext } from "../AppContainer";

export default class ChatContainer extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { navigation } = this.props;
        const channelId = navigation.getParam('channelId')
        const channelName = navigation.getParam('channelName')
        return (
            <MyContext.Consumer>
                {value => {
                    return (
                        <Chat
                            getMessagesForChannel={value.getMessagesForChannel}
                            sendMessage={value.sendMessage}
                            messages={value.messages}
                            channelId={channelId}
                            channelName={channelName}
                            userId={value.userId}
                        />
                    )
                }}

            </MyContext.Consumer>
        )
    }
}
