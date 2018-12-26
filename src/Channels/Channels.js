import React from 'react'
import { View, ActivityIndicator } from 'react-native';
import {ListItem} from 'react-native-elements'

class Channels extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getParticipatedChannels()
    }

    renderChannels = (participatedChannels) => {
        return participatedChannels.map((participatedChannel, index) => (
            <ListItem
                onPress={() => this.navigateToChatScreen(participatedChannel.channel)}
                key={index}
                title={participatedChannel.channel.channelId}
                bottomDivider={true}
                chevron={true}
            />
        ))

    }

    navigateToChatScreen(channel) {
        const channelName =  channel.channelId
        const channelId =  channel.channelId
        this.props.navigateToChat(channelId, channelName)
    }

    render() {
        const channels = this.props.channels
        if(this.props.channels === undefined) {
            return (
                <ActivityIndicator size='large' color='#715ebc'/>   
            )
        }
        return (
            <View style={{ flex: 1}}>
                {this.renderChannels(channels)}
            </View>
        );
    }
}

export default Channels