import React, { Component } from "react";
import {
    View,
    Text,
    FlatList,
    ActivityIndicator,
    Image,
    Dimensions,
    TouchableHighlight,
    TouchableWithoutFeedback,
    StyleSheet,
    ScrollView
} from 'react-native';
import { List, ListItem, SearchBar } from "react-native-elements";
import Icon from 'react-native-vector-icons/FontAwesome'
import { Actions } from 'react-native-router-flux';
import {OptimizedFlatList} from 'react-native-optimized-flatlist'
import FastImage from 'react-native-fast-image'

const {width, height} = Dimensions.get('window')
class SearchComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false,
      searchtext:"",
      per_page:6
    };
  }

  componentWillMount() {
   
  }



  makeRemoteRequest = () => {
    const { page,per_page } = this.state;

    const url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=3e7cc266ae2b0e0d78e279ce8e361736& format=json&nojsoncallback=1&safe_search=1&page=1&per_page=${per_page}&text=${this.state.searchtext}`;

    this.setState({ loading: true });

    fetch(url)
      .then(res => res.json())
      .then(res => {
       

     
        console.log("DATA**************************"+JSON.stringify(res))
        this.setState({
          // data: page === 1 ? res.photos.photo : [...this.state.data, ...res.photos.photo],
          // error: res.error || null,
          data: [...res.photos.photo],
          loading: false,
          refreshing: false
        });
     
       
      })
      .catch(error => {
       
        this.setState({ error, loading: false , data:[]});

      });
  };



  handleLoadMore = () => {

    console.log("LISTINGDATA**********************"+this.state.data)
    this.setState(
      {
        per_page: this.state.per_page + 6
      },
      () => {
        this.makeRemoteRequest();
      }
    );
  };


  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#CED0CE",
        
        }}
      />
    );
  };



  renderFooter = () => {
    if (!this.state.loading) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  imageDetail(item){
    var uri = `https://farm${item.farm}.staticflickr.com/${item.server}/${item.id}_${item.secret}.jpg`
    Actions.imageDetail({photoInfo:uri})
  }


  renderList(item){

    var uri = `https://farm${item.farm}.staticflickr.com/${item.server}/${item.id}_${item.secret}.jpg`;
    
    return(

   
    <TouchableHighlight onPress={() => this.imageDetail(item)}>
       <View style={{width:width/2}}>
    <FastImage
    style={{aspectRatio:1,width:width/2}}
    source={{
      uri:  uri, priority: FastImage.priority.normal
    }}
   
  />
  </View> 
    </TouchableHighlight>
 
    ) 
 
  }

  deleteData(){
    this.setState({ data: [],searchtext: ""  })
}
  


  render() {
  // if(!this.state.data){
  // return(<Text>Loading...</Text>) 
  //   }
    
 return (
<List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0,width:width }}>
<View style={{width:"83%"}}>
<SearchBar placeholder="Type Here..."  autocorrect={false} onChangeText={(text) => this.setState({searchtext:text})} value={this.state.searchtext} lightTheme round />
{this.state.searchtext ? 
                    <TouchableWithoutFeedback onPress={() => this.deleteData()}>
                        <Icon 
                            name="times-circle"
                            color="grey"
                            size={18}
                            style={styles.iconInputClose}
                        />
                    </TouchableWithoutFeedback>
                    : null}
</View>
<TouchableHighlight onPress={()=> this.makeRemoteRequest()}>
<View style={{backgroundColor:"blue",padding:14,position:"absolute",right:2,top:-45,borderRadius:15}}>
<Text style={{backgroundColor:"transparent"}}>Done</Text></View>
</TouchableHighlight>
<ScrollView>
        <FlatList
          data={this.state.data }
          renderItem={({ item })=> this.renderList(item) }
          contentContainerStyle={{ flexDirection: 'row',
          flexWrap: 'wrap'}}
          columnWrapperStyle={{marginTop: 5}}
          numColumns={2}
          keyExtractor={(item, index) => item.id}
          ItemSeparatorComponent={this.renderSeparator}
          ListFooterComponent={this.renderFooter}
       
          pageSize={3}
          maxToRenderPerBatch={3}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={10}
        />
 </ScrollView>
      </List>
    );
  }
}

export default SearchComponent;


const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#181818'
  },
  header: {
      height: 40,
      backgroundColor: '#181818',
      borderBottomWidth: 1,
      borderColor: '#3a3a3a',
      paddingBottom: 5,
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
      position: 'relative'
  },
  searchIcon: {
      position: 'absolute',
      top: 5,
      left: 15,
      zIndex: 1,
      backgroundColor:'transparent'
  },
  iconInputClose: {
      position: 'absolute',
      top: 15,
      right: 15,
      backgroundColor: 'transparent',
      zIndex: 1
  },
  input: {
      width: width - (width / 4),
      height: 30,
      backgroundColor: '#323232',
      marginHorizontal: 10,
      paddingLeft: 30,
      borderRadius: 3,
      color: 'grey'
  },
  cancelButtonText: {
      color: 'white'
  },
  image: {
      marginRight: 5,
      width: 115,
      height: 170
  }
})