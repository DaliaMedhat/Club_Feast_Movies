import React from 'react';

import {
  Image,
  StyleSheet,
  Text,
  View,
  
} from 'react-native';
import app from '../config/app';

const MovieComponent = (props) => {
  return (
    <View style={styles.movieContainer}>
      
      <Image
        style={styles.imageContainer}
        source={{uri: app.URIimage + props.poster_path,}}/>

          <View style={styles.textContainer}>
              <Text style={styles.titleText}> {props.original_title}</Text>   
              <Text style={styles.detailsText}> {props.release_date}</Text>
              <Text> {props.genre} </Text>
              <Text style={styles.ratingText}> {props.vote_average*10}%</Text>
          </View>
          
      </View>
  )
}

const styles = StyleSheet.create({

  movieContainer: {
    display:'flex',
    flexDirection: 'row',
    width:  '100%',
    height: '100%' ,
  },
  imageContainer:{
    flex:1,
    height:'100%',
    borderRadius: 10,
    marginLeft:'5%',
    resizeMode:'contain'
  },
  textContainer:{
    flex:2,
    paddingTop: '9%',
    paddingBottom: '9%',
    paddingLeft: '3%',
    flexWrap: 'wrap',
  },
  titleText: {
    flexDirection: 'row',
    width: '95%',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Century Gothic',
    color: 'black'
  },
  detailsText: {
    paddingTop: '2%',
    fontSize: 14,
    fontFamily: 'Century Gothic',
    justifyContent: 'flex-start',
  },
  ratingText:{
    fontSize: 20,
    color: 'green',
    padding: '3%',
    fontWeight:'bold',
    position:'absolute',
    bottom:'18%',
    right: '10%'
  },
});

export default MovieComponent;