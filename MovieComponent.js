import React from 'react';

import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback 
} from 'react-native';

const MovieComponent = (props) => {
  return (
    <View style={styles.moviePosters}>
      <Image
        style={{ width: '70%', height: '33%'}}
        source={{uri: "https://image.tmdb.org/t/p/w500"+ props.poster_path,}}/>

          <View style={styles.textContainer}>
              <Text style={styles.buttonText}> {props.original_title}</Text>   
                  <TouchableWithoutFeedback    
                  //key={props.genre.id}  
                  underlayColor='#dddddd'>
                  <Text style={styles.genreTextStyle}> 
                  {props.genre}  
                  </Text>
                </TouchableWithoutFeedback >
              <Text style={styles.detailsText}> Release Date: {props.release_date}</Text>
              <Text style={styles.voteAverageStyle}> Rating: {props.vote_average}</Text>
          </View>
      </View>
  )
}

const styles = StyleSheet.create({

  detailsText: {
    paddingTop: '2%',
    fontSize: 14,
    fontFamily: 'Century Gothic',
  },
  voteAverageStyle:{
    alignSelf: 'flex-end',
    flexDirection: 'column'
    // paddingTop: '20%'
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Century Gothic',
    
  },
  moviePosters: {
    flexDirection: 'row',
    width:'70%',
    height: '190%',
    paddingBottom: '62%',
  },
  genreLayout:
  {
    margin: '3%',
    flexDirection: 'row',
  },
  genreTextStyle:{
    fontWeight: 'bold',
    fontFamily: 'Century Gothic',
    borderWidth: 2,
    borderRadius: 10,
    color: 'black',
    backgroundColor: '#D5D5D5',
    marginRight: 3,
  },
  textContainer:{
    flexWrap: 'wrap',
    paddingLeft: '7%',
    flexDirection: 'row',
    paddingTop: '7%',
    justifyContent: 'flex-start',

  },
});

export default MovieComponent;