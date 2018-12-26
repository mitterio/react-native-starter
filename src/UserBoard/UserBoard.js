import { ListItem } from 'react-native-elements'
import React from 'react'
import { starterAppServerHost } from '../constants'
import { View } from 'react-native'
import axios from 'axios'

export default class UserBoard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      users: []
    }
    this.starterAppServerUrl = starterAppServerHost()
  }

  componentDidMount() {
    axios({
      method: 'GET',
      url: `${this.starterAppServerUrl}/users`
    })
      .then(res => {
        this.setState({ users: res.data })
      })
      .catch(res => {
        console.log('error in fetching users', res)
      })
  }

  getMitterAuthToken(user) {
    const mitter = this.props.mitter
    axios({
      method: 'POST',
      url: `${this.starterAppServerUrl}/users/login`,
      data: {
        username: user
      }
    })
      .then(res => {
        const mitterUserAuthToken = res.data.mitterUserAuthorization
        this.props.setAuthorization(mitterUserAuthToken)
        this.props.navigateToChannel()
      })
      .catch(res => {
        console.log('error in fetching users', res)
      })
  }

  renderUsers = () => {
    return this.state.users.map((user, index) => (
      <ListItem
        onPress={() => this.getMitterAuthToken(user)}
        key={index}
        title={user}
        bottomDivider={true}
        chevron={true}
      />
    ))
  }

  render() {
    return (
      <View>
        {this.renderUsers()}
      </View>
    )
  }
}
