import React from 'react'
import { View, ActivityIndicator, FlatList, Text, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Icon, Input } from 'react-native-elements'

export default class Chat extends React.Component {
    constructor(props) {
        super(props)
        this.userId = this.props.userId
        this.state = { typedMessage: '' }

    }

    componentDidMount() {
        this.props.getMessagesForChannel(this.props.channelId)
    }

    renderMessage = ({ item }) => {
        return (
            <View
                style={
                    [styles.messageBubble,
                    this.userId === item.senderId.identifier ? styles.sentMessage : styles.receivedMessage]
                }>
                <Text>
                    {item.textPayload}
                </Text>
            </View>
        )
    }

    onChange = (text) => {
        this.setState({ typedMessage: text })
    }

    sendMessage = () => {
        const typedMessage = this.state.typedMessage
        if (typedMessage !== '') {
            this.props.sendMessage(this.state.typedMessage, this.props.channelId)
            this.setState({ typedMessage: '' })
        }
    }

    render() {
        const messages = this.props.messages[this.props.channelId];
        return (
            <KeyboardAvoidingView
                style={{ flex: 1, paddingBottom: 2 }}
                behavior="padding"
                enabled
                keyboardVerticalOffset={Platform.OS === 'ios' ? 70 : 0}>

                <FlatList
                    data={messages}
                    renderItem={this.renderMessage}
                    style={{ display: 'flex' }}
                    keyExtractor={item => item.messageId}
                />

                <View style={{ display: 'flex', flexDirection: 'row', height: 40 }}>
                    <Input
                        placeholder={'Type Your Message Here'}
                        placeholderTextColor={'#715ebc'}
                        containerStyle={{ borderWidth: 1, borderColor: 'grey', borderRadius: 5, width: '100%' }}
                        onChangeText={this.onChange}
                        value={this.state.typedMessage}
                        rightIcon={
                            <Icon
                                name='send'
                                size={24}
                                color='black'
                                onPress={this.sendMessage}
                            />
                        }
                    />
                </View>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    root: {
        backgroundColor: "white",
        flex: 1
    },
    messageBubble: {
        height: 55,
        width: 125,
        margin: 10,
        justifyContent: 'center',
        display: 'flex',
        alignItems: 'center',
        opacity: 1,
        borderRadius: 10,
        //alignSelf: 'flex-end'
    },
    sentMessage: {
        alignSelf: 'flex-end',
        backgroundColor: "rgba(210,211,255,1)",

    },
    receivedMessage: {
        alignSelf: 'flex-start',
        backgroundColor: "rgba(184, 249, 231,1)"
    }
});
