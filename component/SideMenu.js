import React, { Component } from 'react';
import { Container, Header, Button, ListItem, Text, Icon, Left, Body, Right, Switch,List,Grid,Row } from 'native-base';
import Fontisto from 'react-native-vector-icons/Fontisto'
import { ScrollView, View, TouchableOpacity ,SafeAreaView, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
export default class SideMenu extends Component {
  constructor(props) {
    super(props);
 
    this.state = {
      loggedIn: ''
    };
    
  }

  signOut (){
    auth().signOut().then(() => {
       AsyncStorage.removeItem('uid');
       Alert.alert(
           "You have successfully logged out.",
           "Please come back soon.",
           [
             { text: "OK",   onPress: () => this.props.navigation.navigate('Login')}  
           ],
           { cancelable: false }
         );
      
   })
   .catch(error => this.setState({ errorMessage: error.message }))
}

  async componentDidMount(){
    const userId= await AsyncStorage.getItem('uid');
    
    this.setState({
      loggedIn : userId
    })
}
  render() {
    const {loggedIn} = this.state;
    return (
      <SafeAreaView style={{flex: 1}}>
        <Header style={{backgroundColor:'salmon'}}>
            <Left/>
            <Body style={{flex: 3}}>
                <Text style={{fontWeight:'bold', color: 'white'}}>
                    Kus I N A H A N G L A N
                </Text>
            </Body>
            <Right/>
        </Header>

          <ScrollView contentContainerStyle={{flex:1}}>
          <ListItem icon onPress={()=> this.props.navigation.navigate('AddRider')}>
            <Left>
              <Button style={{ backgroundColor: "skyblue" }}>
              <Fontisto name="motorcycle" size={18} color="white"/>
              </Button>
            </Left>
            <Body>
              <Text>Add Rider</Text>
            </Body>
            <Right>
              <Icon active name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem icon onPress={()=> this.props.navigation.navigate('AddStore')}>
            <Left>
              <Button style={{ backgroundColor: "white" }}>
              <Fontisto name="shopping-store" size={18} color="red"/>
              </Button>
            </Left>
            <Body>
              <Text>Add Store</Text>
            </Body>
            <Right>
              <Icon active name="arrow-forward" />
            </Right>
          </ListItem>
      
          </ScrollView>
          <List style={{justifyContent:'flex-end'}}>
         {
           loggedIn ?
            <ListItem onPress={()=> this.signOut()}>
              <Text>Log Out</Text>
            </ListItem> :
             <ListItem onPress={()=> this.props.navigation.navigate("Login")}>
              <Text>Sign In</Text>
            </ListItem>
         }
           <ListItem>
            <View>
            <Grid>
              <Row style={{alignItems: 'center'}}><TouchableOpacity style={{flexDirection: 'row'}} onPress={() => Linking.openURL('https://icons8.com').catch(err => console.error('An error occurred', err))} ><Text> Icons by Icons8</Text></TouchableOpacity></Row>
            </Grid>
          </View>
           </ListItem>
          </List>
      </SafeAreaView>
    );
  }
}