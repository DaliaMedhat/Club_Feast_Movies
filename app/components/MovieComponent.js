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
    <View style={styles.moviePosters}>
      <Image
        style={{ width: '70%', height: '33%'}}
        source={{uri: app.URIimage + props.poster_path,}}/>

          <View style={styles.textContainer}>
              <Text style={styles.buttonText}> {props.original_title}</Text>   
              <Text style ={styles.buttonText}> {props.genre} </Text>
              <Text style={styles.detailsText}> {props.release_date}</Text>
              <Text style={styles.ratingText}> {props.vote_average*10}%</Text>
          </View>
      </View>
  )
}

const styles = StyleSheet.create({


  moviePosters: {
    flexDirection: 'row',
    width:'70%',
    height: '190%',
    paddingBottom: '62%',
  },
  textContainer:{
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingLeft: '7%',
    paddingTop: '7%',
    justifyContent: 'flex-start',

  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Century Gothic',
    
  },

  genreLayout:
  {
    margin: '3%',
    flexDirection: 'row',
  },
  genreTextStyle:{
    width:"100%",
    height:"5%",
    fontWeight: 'bold',
    fontFamily: 'Century Gothic',
    borderWidth: 2,
    borderRadius: 10,
    color: 'black',
    backgroundColor: '#D5D5D5',
    marginRight: 3,
  },
  detailsText: {
    paddingTop: '2%',
    fontSize: 14,
    fontFamily: 'Century Gothic',
    justifyContent: 'flex-start',
  },

  ratingText:{
    fontSize: 16,
    color: 'green',
    padding: '3%',
    fontWeight:'bold',
    flexDirection: 'column',
    alignSelf: 'flex-end',

  },
});

export default MovieComponent;