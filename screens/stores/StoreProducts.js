import React, { Component } from "react";
import { Platform, StyleSheet,  View,SafeAreaView } from "react-native";
import DynamicTabView from "react-native-dynamic-tab-view";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { Container, Header, Item, Input, Icon, Button, Text, Left, Right,Body,Title,Form, Picker, Fab } from 'native-base';

import Products from '../../component/Products'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

class StoreProducts extends Component{
  constructor(props) {
    super(props);
    const store =  this.props.route.params.store;
    this.ref = firestore()
    this.state = {
      defaultIndex: 0,
      category : store.category,
      store_name: store.name,
      store_id: store.id,
      visibleModal: false,
      count: 0,
      stores:[],
      cluster:'',
      city:'',
      section: '',
      active: false,
      open: false,
      store: store.id
    };
  }

  _bootstrapAsync = async () =>{
    this.unsubscribe = this.ref.collection('stores').where('id', '==', this.state.store).onSnapshot(this.onCollectionUpdate);
  };


  onCollectionUpdate = (querySnapshot) => {
    const stores = [];
    querySnapshot.forEach((doc) => {
        this.setState({
            category : doc.data().subcategory,
            store_name: doc.data().name,
            store_id: doc.data().id, 
            city: doc.data().city, 
            cluster: doc.data().cluster, 
            section: doc.data().section,
            image: doc.data().foreground
         });
    });
  }

  _renderItem = (item, index) => {
    return (
      <View
        key={item["key"]}
        style={{ backgroundColor: '#ffffff', flex: 1}}
      >
        <Products title={item["title"]} store={this.state.store_name} storeId={this.state.store_id} category={this.state.category}  navigation={this.props.navigation}/>
      </View>
    );
  };

  
  componentDidMount(){
    this._bootstrapAsync()
  }


 onStateChange = ({ open }) => this.setState({ open: !this.state.open });


  onChangeTab = index => {};
  

    
render() {
   const { open } = this.state;
    return (

    <SafeAreaView style={{flex: 1}}>
      <DynamicTabView
        data={this.state.category}
        renderTab={this._renderItem}
        defaultIndex={this.state.defaultIndex}
        containerStyle={styles.container}
        headerBackgroundColor={'white'}
        headerTextStyle={styles.headerText}
        onChangeTab={this.onChangeTab}
        headerUnderlayColor={'tomato'}
      /> 
        
  </SafeAreaView>
    );
  }
}

export default  StoreProducts;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 0,
    paddingTop: 0,
    marginTop:0,
    marginBottom:0,
    height: 50
  },

  headerContainer: {
    marginTop: 5,
   
  },
  headerText: {
    color:'black'
  },
  tabItemContainer: {
    backgroundColor: "#cf6bab"
  },
  content: {
    backgroundColor: 'white',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
});