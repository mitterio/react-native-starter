import { MyContext } from "../AppContainer";
import UserBoard from './UserBoard'
import React from "react";

export default class UserBoardContainer extends React.Component {
  constructor(props) {
    super(props)
  }

  navigateToChannel = () => {
    this.props.navigation.navigate('Channels')
  }

  render() {
    return (
      <MyContext.Consumer>
        {value => {
          return (
            <UserBoard
              setAuthorization={value.setAuthorization}
              navigateToChannel={this.navigateToChannel}
            />
          )
        }}
      </MyContext.Consumer>
    )
  }
}