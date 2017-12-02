import React from 'react';
import {
  AsyncStorage,
  TextInput,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image
} from 'react-native';
import { StackNavigator } from 'react-navigation';
// import axios from 'axios'
import { Button } from 'react-native-elements';
import Modal from 'react-native-modal'

import { TextField } from 'react-native-material-textfield';
import { Container, Header, Content, Form, Item, Input, Label } from 'native-base';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

export default class Inputbudget extends React.Component {
  static navigationOptions = {
    title: 'Set Budget'
  };

  constructor() {
    super()
    this.state = {
      isModalVisible: false,
      text: '',
      budget: 0
    }
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });

    AsyncStorage.getItem('budget').then((data) => {
      // console.log("----------->", data);
      if (data) {
        this.setState({
          budget: 1
        })
      } else {
        this.setState({
          budget: 2
        })
      }
    })
  }

  simpanBudget () {
    this._hideModal()

    if (this.state.text) {
      AsyncStorage.setItem('budget', this.state.text).then((data) => {
        if (data) {
          this.props.navigation.navigate('Currentballance')
        }
      }).catch((reason) => {
        console.log(reason);
      })
    } else {
      alert('Budget Cannot null')
    }
  }

  _showModal = () => this.setState({ isModalVisible: true })

  _hideModal = () => this.setState({ isModalVisible: false })

  rendering () {
    if (this.state.budget === 0) {
      return (
        <View><Text>Loading</Text></View>
      )
    } else if (this.state.budget === 1) {
      return (
        this.props.navigation.navigate('Currentballance')
      )
    } else {
      return (
        <Image source={{uri: 'https://hdwallsource.com/img/2016/9/cash-money-wallpaper-background-49518-51193-hd-wallpapers.jpg'}}>
          <View style={styles.container}>
            <View style={{paddingTop: 100}}>
              <Button
                raised
                icon={{name: 'code', size: 20}}
                onPress={this._showModal}
                buttonStyle={{backgroundColor: 'blue', borderRadius: 20}}
                textStyle={{textAlign: 'center'}}
                title={`Input Budget`}
              />
            </View>

            <View>
              <Modal
              isVisible={this.state.isModalVisible}
              style={styles.bottomModal}
              animationIn={'slideInLeft'}
              animationOut={'slideOutRight'}
              >
              <View>

              <TextInput
                style={{height: 40, width: responsiveWidth(80), borderColor: 'gray', borderWidth: 1, paddingLeft: 20, paddingRight: 20}}
                onChangeText={(text) => this.setState({text})}
                value={this.state.text}
              />

              </View>
              <View style={{flex: 1, flexDirection: 'row', paddingTop: 20}}>
                <View style={{flex: 1}}>
                  <Button
                  title='Cencel'
                  buttonStyle={{backgroundColor: 'red',borderRadius: 10}}
                  onPress={this._hideModal}
                  />
                </View>
                <View style={{flex: 1}}>
                  <Button
                  title='Save'
                  buttonStyle={{backgroundColor: 'red',borderRadius: 10}}
                  onPress={() => this.simpanBudget()}
                  />
                </View>
              </View>
              </Modal>
            </View>
          </View>
        </Image>
      )
    }
  }

  render() {
    return (
      this.rendering()
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: responsiveHeight(100)
  },
  bottomModal: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  Inputbudget: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover'
  }
});
