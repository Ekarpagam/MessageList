/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, AppRegistry,Image,RefreshControl,StyleSheet,KeyboardAvoidingView,List,FlatList,TouchableOpacity,TextInput,AsyncStorage, ScrollView,Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import MSSQL from 'react-native-mssql';


const styles = StyleSheet.create({
    row: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sender: {
    fontWeight: 'bold',
    paddingRight: 10,
    fontSize: 15,
     color: '#000000',
  },
  sender1: {
   flex:1,
    paddingRight: 10,
    fontSize: 10, color: '#a9a9a9',flexDirection: 'column',flexWrap: 'wrap',
  },
  sender2: {
   flex:2,
    paddingRight: 2, alignSelf: 'flex-end', 
        justifyContent: 'space-around',
   fontWeight: 'bold',
    fontSize: 10, color: '#a9a9a9',flexDirection: 'column',
  },
  container: {
   flex: 1,
   height: 500, backgroundColor: '#ffffff', padding: 10,marginTop :10
  // paddingTop: 22, fontWeight: 'bold',
  },
  item: {
    padding: 5,
    fontSize: 18,
    height: 44, fontWeight: 'bold',
  },
  imag:{
     borderRadius: 25/2,
    width: 25,
    height: 25,
   // marginRight: 10
  },
  wrdsty: {
        flex:0.1,
        padding: 1,
      //  color: 'black',
        alignSelf: 'center',
       flexDirection: 'row',
    },

});


export default class ListMsg extends Component<Props> {
   constructor(props) {
   super(props);
   this.state = {
    data:[],refreshing: false,
    };
    //AsyncStorage.removeItem('key')
  }
 

async retrieveItem() 
  {
     this.props.navigation.navigate('Msg', { onGoBack: () => this.refresh(), });
  }
 
 componentWillMount()
 {

    AsyncStorage.getItem('key')
       .then((result) => {
           if (result) {
               try {

                let res = JSON.stringify(result);
                let hello = JSON.parse(result) 
                   console.log(res,hello,"hello result parserssfty")

                    this.setState({data: hello})
               }
               catch (e) {
                    console.error('key: ' + key, e.message);
               }
           }
           return result;
       });
 }

  onRefresh = () => {
    this.setState({refreshing: true});
    fetchData().then(() => {
      this.setState({refreshing: false}); });}


  keyExtractor = item => item.id;
  renderItem({item}) {
    
    //console.log(item.msgTitle,item.msgbdy,item.fullTime,"1,2")
    return (
      <View style={styles.row}>
        <View style={{backgroundColor: 'white'}}>
        <Image source={item.picture}  style={styles.imag} /> 
         </View>
        <View style={{backgroundColor: 'white',flexDirection: 'column'}}>
        <Text style={styles.sender}>{item.msgTitle}</Text>
        <Text style={styles.sender1}>{item.msgbdy}</Text>
         </View>
           <View style={{backgroundColor: 'white',flex:1,flexDirection: 'column'}}>
           <Text style={styles.sender2}>{item.fullTime}</Text>
           
           </View>

      </View>
    );
  }


   render() {
    
    return (

    
      <View style={styles.container}>

         <TouchableOpacity style={styles.wrdsty} onPress={this.retrieveItem.bind(this)}>
          
          <Text style = {{fontWeight: 'bold',color: '#000000', alignItems:'center',justifyContent: 'center',}} >                      Coversations     /Text>
          <Text style = {{fontWeight: 'bold',alignItems:'flex-end',color: '#dc143c', justifyContent: 'center',}} >                          ADD</Text>
        </TouchableOpacity>

       <FlatList
        style={{
          flex: 1,
          backgroundColor: 'white',
        }}   ref = 'scroll' refreshControl={ <RefreshControl refreshing={this.state.refreshing}  onRefresh={this.onRefresh}/>}
        data={this.state.data}
            keyExtractor={this.keyExtractor}
        renderItem={this.renderItem.bind(this)}
        
      />


      </View>
     

      );
  }
  }
     

       
