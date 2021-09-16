import React, { Component } from "react";
import {StyleSheet, FlatList, TouchableOpacity, TextInput,ScrollView,View} from 'react-native';
import { Container, Header, Icon, Accordion, Text, Card, CardItem, Thumbnail, Body, Left, Right, Button, List, ListItem } from "native-base";

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Octicons from 'react-native-vector-icons/Octicons'

import Modal from 'react-native-modal';
import CustomHeader from "../component/CustomHeader";
import Loader from "../component/Loader";

export default class Rider extends Component {
  constructor(props) {
    super(props);
    this.ref = firestore().collection('riders');
    this.unsubscribe = null;
    this.state = {
      text: '',
      data:[],
      visibleModal: false,
      Name: '',
      Mobile: '',
      Email: '',
      Gender: '',
      Address: '',
      Status: '',
      loading: false
    };
    this.arrayholder = [];
  }
    
  onCollectionUpdate = (querySnapshot) => {
    const stores = [];
    querySnapshot.forEach((doc) => {
     stores.push ({
            datas : doc.data(),
            key : doc.id
            });
    });
    this.arrayholder = stores;
    this.setState({
      data : stores,
      loading: false
   });
  
  }
  componentDidMount(){
    this.setState({loading: true})
     this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
 
  }

  updateStatus(id){
    let prodref = firestore().collection('users').doc(id);
    prodref.update({
      status:  "Verified",

    });
    this.setState({visibleModal: false})
  }

  GetFlatListItem(name) {
    Alert.alert(name);
  }
 
  searchData(text) {
    const newData = this.arrayholder.filter(item => {    

      const itemData = `${item.datas.Name.toUpperCase()}   
       ${item.key.toUpperCase()}`;
      
       const textData = text.toUpperCase();
        
       return itemData.indexOf(textData) > -1;
    });
 
    this.setState({
      data: newData,
      text: text
      })
    }

    toggleMOdal(item, key){
      this.setState({
        Name: item.Name,
        Mobile: item.Mobile,
        Email: item.Email,
        Gender: item.Gender,
        Address: `${item.Address.Address}, ${item.Address.Barangay}, ${item.Address.City}, ${item.Address.Province}, ${item.Address.Country}`,
        Status: item.status,
        visibleModal: true,
        id: key
      })
    }

  _renderHeader(item, expanded) {
    return (
      <List>
      <ListItem avatar onPress={()=> this.props.navigation.navigate('Details',{'id': item.key,'name': item.datas.Name})}>
        <Left>
          <Thumbnail source={require('../assets/user.png')} />
        </Left>
        <Body>
          <Text>{item.datas.Name}</Text>
          <Text note style={{fontSize: 12}}>{item.key}</Text>
        </Body>

      </ListItem>
    </List>

    );
  }

  render() {
    const {   Name,
      Mobile,
      Email,
      Gender,
      Address,
      Status,
      id 
    } = this.state;
    return (
      <Container>
        <Loader loading={this.state.loading} />
        <CustomHeader isHome={true} title="Riders" navigation={this.props.navigation}/>
        <TextInput 
         style={styles.textInput}
         onChangeText={(text) => this.searchData(text)}
         value={this.state.text}
         underlineColorAndroid='transparent'
         placeholder="Search Here" />
        <View>
        <FlatList
               data={this.state.data}
               renderItem={({ item }) => (
                 
                    this._renderHeader(item)
                
                  
               )}
               keyExtractor={item => item.key}
               
           />
        </View>
      </Container>
    );
  }
}

const style = StyleSheet.create({
  wrapper: {
    // marginBottom: -80,
    backgroundColor: "white",
    height: 80,
    width: "100%",
    padding: 10
  },
  notificationContent: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start"
  },
 sssage: {
    marginBottom: 2,
    fontSize: 14
  },
  closeButton: {
    position: "absolute",
    right: 10,
    top: 10
  },
  content: {
    backgroundColor: 'white',
    padding: 22,
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  contentTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
});

const styles = StyleSheet.create({

  row: {
    fontSize: 18,
    padding: 12
  },
 
  textInput: {
 marginTop: 5,
    textAlign: 'center',
    height: 42,
    borderWidth: 1,
    borderColor: '#009688',
    borderRadius: 8,
    backgroundColor: "#FFFF"
 
  }
});