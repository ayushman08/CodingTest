import  {
View,
ListView,
Text,
TextInput,
StyleSheet,
Image,
TouchableHighlight,
} from 'react-native';

import React, { Component } from "react";
import { Actions } from 'react-native-router-flux';
import FastImage from 'react-native-fast-image'

class ImageDetail extends Component{
	render() {
		var photo = this.props.photoInfo;
		// var url = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;
		return (
		<View style={styles.imageContainer}>
     <View style={styles.viewStyle}>
         <TouchableHighlight onPress={()=>Actions.pop()}>
        <Text style={{padding:10 ,fontWeight:"400"}}>Back</Text>
        </TouchableHighlight>
      
    </View>
    <FastImage
          source={{uri: photo , priority: FastImage.priority.normal}}
          style={styles.image}
          resizeMode={FastImage.resizeMode.center}
         
        />
      </View>
		)
	}
}

var styles = StyleSheet.create({
	imageContainer: {
    flex: 1,
    // alignItems: 'stretch'
  },
  image: {
    flex: 1,
    
  },
  viewStyle: {
    backgroundColor: '#F8F8F8',
    justifyContent: 'flex-start',
    // alignItems: 'center',
    height: 60,
    paddingTop: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    position: 'relative'
  },
  textStyle: {
    fontSize: 20
  }
})

export default ImageDetail;