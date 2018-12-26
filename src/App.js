import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import Container from './AppContainer'
import { Mitter } from '@mitter-io/react-native'
import { applicationId } from './constants'
const mitter = Mitter.forReactNative(applicationId)

export default class App extends Component {
  render() {
    return (
      <Container mitter={mitter} />
    );
  }
}

