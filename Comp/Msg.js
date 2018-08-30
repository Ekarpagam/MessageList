/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform,AppRegistry, StyleSheet,KeyboardAvoidingView,AsyncStorage,FlatList,TouchableOpacity,TextInput,Button, ScrollView,Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import MSSQL from 'react-native-mssql';


const styles = StyleSheet.create({

    txtin: {
       flex:1,
        padding: 2,
       fontSize: 18,
       width :300, lineHeight: 30,
      alignItems: 'center',borderColor: 'gray', //borderWidth: 1,
      marginTop :5,flexDirection: 'column', justifyContent: 'space-around',//fontWeight: 'bold', 
    }, 

    vewsty:
    {
     backgroundColor: '#ffffff',
    flexDirection: 'column', 
    padding: 10,marginTop :10
    },

   vewsty1:
    {
     backgroundColor: '#ffffff',
    flexDirection: 'row', 
    padding: 10,marginTop :5
    },

    lblsty: {
    flex:0.2,
    fontWeight: 'bold', 
    color: '#dc143c', justifyContent: 'space-around'
  },

wrdsty: {
        flex:0.3,
        padding: 4,
      //  color: 'black',
        alignItems:'center',
       justifyContent: 'space-around', alignSelf: 'flex-end',
    },
   btnsty: {
        flex:1,
        padding: 1,alignItems:'center',
     //  fontWeight: 'bold', 
     //   color: '#dc143c',
     alignSelf: 'center', 
        justifyContent: 'center',
    },
    row: {
    flexDirection: 'row',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  sender: {
    fontWeight: 'bold',
    paddingRight: 10
  },

});

export default class Msg extends Component<Props> {
   
  constructor(props) {
   super(props);
   this.state = {
    messageTitle:'',
    messageBody:'',newarr :[]

    };
   // AsyncStorage.removeItem('key')
  }
 
 
  async  onPressButton () 
   {
      try 
      {
        var date = new Date().getDate();  var month = new Date().getMonth() + 1 ;
        var year = new Date().getFullYear();  var time=new Date().getHours();
        var  minutes = new Date().getMinutes();  var  seconds = new Date().getSeconds();
        let pic2 = { uri:'http://blog.easemytrip.com/wp-content/uploads/2017/09/valley-flower-1024x630.png' };
        var msgbdy,msgTitle,fullTime,picture;
     
       let msgval =
       {

          msgTitle : this.state.messageTitle,
          msgbdy : this.state.messageBody,
          id : 0, picture: pic2,
          fullTime : date + '-' + month + '-' + year + '     ' + time +':'+minutes+':'+seconds
       }

             //msgval = JSON.stringify(msgval);
             //console.log(msgval+"nnnnnnnnnnnn")

            var newarr = await AsyncStorage.getItem('key');
            console.log(newarr,"newarr  in asyns storgawe")
             if (newarr !== null) 
             {
               // newarr = JSON.stringify(newarr);
               //   console.log(newarr+"123456")
               //  var valcon = newarr.concat(msgval)
               // let valcon = [newarr, ...msgval]
               //   console.log(valcon+"21154154")
               //   return await AsyncStorage.setItem('key', JSON.stringify(valcon));

               newarr = JSON.parse(newarr);
               let arr = newarr.concat(msgval);
               console.log(arr , "123456");
               AsyncStorage.setItem("key", JSON.stringify(arr)).then((val) => {
               console.log(val,"valuev fdjfdjbdata updated."); });
               this.props.navigation.navigate('ListMsg',{ onGoBack: () => this.refresh(), });
              }
             else
             {    let msg =[msgval]
                 return await AsyncStorage.setItem('key', JSON.stringify(msg));
                 console.log("data upda")
                 this.props.navigation.navigate('ListMsg',{ onGoBack: () => this.refresh(), });
             }
    } 
    catch (error) {
         console.error('AsyncStorage#setItem error: ' + error.message);
    }
  }

  


 renderItem({ item }) {
    return (
      <View style={styles.row}>
      
        <View style = {{flex:1}}>
          <Text style={styles.sender}>{item.result }</Text>
        </View>
      </View>
    );
  }
 


  render() {
    
    return (
     
      <ScrollView style = {{flex:1, backgroundColor: 'white'}} ref = 'scroll'>
        <KeyboardAvoidingView behavior="padding" enabled>
        <View>


         <View style={styles.vewsty}>
        
        <Text style={styles.lblsty}>Name</Text>
        <TextInput style={styles.txtin}    maxLength = {20}  autoCapitalize="sentences"
        onChange={(event) => this.setState({messageTitle: event.nativeEvent.text})}
          value={this.state.messageTitle}  />
       
       <Text style={styles.wrdsty}>{this.state.messageBody.length}/200</Text>
   
        <Text style={styles.lblsty}>Desc</Text>
        <TextInput style={styles.txtin} maxLength = {200}     value={this.state.value}   
          onChange={(event) => this.setState({messageBody: event.nativeEvent.text})}
          value={this.state.messageBody} 
            ></TextInput>
        
         <Text></Text>

        <TouchableOpacity style={styles.btnsty} onPress={this.onPressButton.bind(this)}>
          <Text style = {{fontWeight: 'bold',color: '#dc143c',}} >Save</Text>
        </TouchableOpacity>

        

        </View>


        </View>
        </KeyboardAvoidingView>
        </ScrollView>

    );
  }
}

