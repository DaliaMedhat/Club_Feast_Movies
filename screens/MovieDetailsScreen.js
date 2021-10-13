import React, {useState, useEffect} from 'react';

// import { useNavigation } from '@react-navigation/native';

import {
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const MovieDetailsScreen = ({route,navigation}) =>{
  const [data, setData] = useState([]);
  const [genreData, setGenreData] = useState([]);

  const  itemId = route.params;
  
  async function getMovieDetails (MovieId) {
    
    var MovieDetailsAPI = 'https://api.themoviedb.org/3/movie/'+ MovieId +'?api_key=4f298a53e552283bee957836a529baec';
    try {
      const response = await fetch(MovieDetailsAPI);
      const json = await response.json();
      setData(json);
      setGenreData(json.genres);
    } 
    catch (error) {
      window.alert('Error');
    
    }
    // console.log(json.genres)
    // console.log(json.genres[0])
    // console.log(json.genres[0].name)
  };
  
  getMovieDetails(JSON.stringify(itemId));

  return(
      <SafeAreaView style={styles.container}>

        <View>
        {/* <ScrollView > */}
        <TouchableOpacity 
        key={data.id} underlayColor='#dddddd'
        onPress={() => navigation.goBack()}> 
        <Text style={styles.backButton}> Back</Text> 
        
        </TouchableOpacity>

        <Text style={styles.movieTitle}> {data.original_title} </Text>
          <Image
              style={{ width: '50%', height: '60%', alignSelf: 'center'}}
              source={{uri: "https://image.tmdb.org/t/p/w500"+ data.poster_path,}}/>

              <View >
                   <Text style={styles.title}>Overview</Text> 
                   <Text style={styles.normalInfo}> {data.overview} </Text>
                   <Text style={styles.title}>Genres</Text> 
                   
                   {/* {genreData.map(item => {
                     <Text style={styles.normalInfo}> {item.name} </Text>
                   })} */}
                  

              </View>

        {/* </ScrollView> */}
        </View>
      </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex:1,
    // width: '100%',
    // height: '100%',
    // flexDirection: 'column',
    // padding: ,
    // alignItems: 'center',
    justifyContent: 'center',
  },
  moviePoster: {
    // flex:1,
    width:'70%',
    height: '100%',
  },
  textContainer: {
    // flex:1,
      // height:'50%'
  },
  movieTitle: {
    padding: '1%',
    margin: '3%',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Century Gothic',
    alignSelf:'center',
    borderWidth: 3,
    borderStyle: "solid",
    borderColor: "#fff",
    borderRadius: 3,
  },
  title: {
    padding: '2%',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Century Gothic',
    // alignSelf:'left',
  },
  normalInfo: {
    fontSize: 16,
    // fontWeight: 'bold',
    fontFamily: 'Century Gothic',
  },
  backButton: {
    alignSelf: 'flex-start',
    marginLeft: 10,
    padding:6,
    borderWidth: 3,
    borderStyle: "solid",
    borderColor: "#fff",
    borderRadius: 3,

    fontSize: 16, 
    fontStyle: 'italic',
    fontFamily: 'Century Gothic'}
});

export default MovieDetailsScreen;