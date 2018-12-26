import {MyContext} from "../AppContainer";
import Channels from './Channels'
import React from "react";

export default class ChannelsContainer extends React.Component {
    constructor(props) {
        super(props)
    }

    navigateToChat = (channelId, channelName) => {
        this.props.navigation.navigate('Chat',{channelId: channelId, channelName: channelName})
    }

    render() {
        return (
            <MyContext.Consumer>
                {value => {
                    return (
                        <Channels
                            getParticipatedChannels={value.getParticipatedChannels}
                            channels={value.channels}
                            navigateToChat={this.navigateToChat}
                        />
                    )
                }}

            </MyContext.Consumer>
        )
    }
}