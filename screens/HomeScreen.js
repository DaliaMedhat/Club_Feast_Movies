import React, {useState, useEffect} from 'react';

import { useNavigation } from '@react-navigation/native';

import {
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator
} from 'react-native';
import MovieComponent from '../MovieComponent';

const HomeScreen = () => {
  const [isLoading, setisLoading] = useState(false);
  const [data, setData] = useState([]);
  const [genresData, setGenresData] = useState([]);
 
  const navigation = useNavigation();

  async function getMovieGenre (MovieId) {
    
    var MovieDetailsAPI = 'https://api.themoviedb.org/3/movie/'+ MovieId +'?api_key=4f298a53e552283bee957836a529baec';
    try {
      // setisLoading(true);
      const response = await fetch(MovieDetailsAPI);
      const json = await response.json();
      setGenresData(json.genres);

      console.log(json.genres)
    } 
    catch (error) {
      window.alert('Error Genre');
      // setisLoading(false);
    }
    finally{
      // setisLoading(false);
    }
  };

  async function getList (type) {
    var MoviesAPI = 'https://api.themoviedb.org/3/movie/upcoming?api_key=4f298a53e552283bee957836a529baec';
    try {
      setisLoading(true);
      if (type === "upcoming") {
         MoviesAPI =
          'https://api.themoviedb.org/3/movie/upcoming?api_key=4f298a53e552283bee957836a529baec';
      }
      else if (type === "popular") {
         MoviesAPI =
          'https://api.themoviedb.org/3/movie/popular?api_key=4f298a53e552283bee957836a529baec';
      } else {
         MoviesAPI =
          'https://api.themoviedb.org/3/movie/top_rated?api_key=4f298a53e552283bee957836a529baec';
      }
      const response = await fetch(MoviesAPI);
      const json = await response.json();
      setData(json.results);
    } 
    catch (error) {
      window.alert('Error List');
      setisLoading(false);
    }
    finally{
      setisLoading(false);
    }
  };

  useEffect(() => {
    
    {data.map(item => {
      // {getMovieGenre(580489)}
      getMovieGenre(item.id);
           
      })}

    return () => {
      setGenresData([]);
    };
      }, []);

  return (
    <SafeAreaView style={styles.container}>
        
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => getList("upcoming")}>
          <Text style={styles.buttonText}>Upcoming</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={(() => getList("popular"))}>
          <Text style={styles.buttonText}>Popular</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={(() => getList("top_rated"))}>
          <Text style={styles.buttonText}>Top Rated</Text>
        </TouchableOpacity>
      
      </View>

      { isLoading &&
      <View style={{flex:1,justifyContent:'center',alignContent:'center'}}>
      <ActivityIndicator size="large" /> 
      </View>
      }

      {!isLoading && 
        <View >
        <ScrollView >
          {data.map(item => {
            return (
              <TouchableOpacity   
              style = {styles.moviesContainer}
              key={item.id} underlayColor='#dddddd'
              onPress={() => navigation.navigate("Movie Details", item.id) }
              >
                <View>
                  <MovieComponent 
                    poster_path= {"https://image.tmdb.org/t/p/w500"+item.poster_path}
                    original_title = {item.original_title}
                    release_date = {item.release_date}
                    vote_average = {item.vote_average}
                    // genre = {genre === '' && 
                    // genresData.map(x =>{
                    //   return(
                    //     <Text style={styles.buttonText}>{x.name}</Text>
                    //   );
                    //  })
                    // }
                    />               
                </View>
                </TouchableOpacity>
            );
          })}
             
        </ScrollView> 
      </View>
      }
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    marginTop: '3%',
    marginBottom: '3%',
  },
  button: {
    width: '30%',
    padding: 10,
    margin: 5,
    borderRadius: 10,
    backgroundColor: '#DDDDDD',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Century Gothic',
    
  },
  detailsText: {
    paddingTop: '2%',
    fontSize: 14,
    fontFamily: 'Century Gothic',
  },
  voteAverageStyle:{
    alignSelf: 'flex-end',
    flexDirection: 'column'
  },
  moviesContainer: {
    display: 'flex',
    flex:1,
    flexWrap: 'wrap',
    flexDirection: 'column',
    width: '70%',
    height: '100%',
    padding: '0.5%'
  },
  moviePosters: {
    // paddingTop: '40%',
    flexDirection: 'row',
    justifyContent: "flex-start",
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
    paddingLeft: '7%',
    flexDirection: 'row',
    paddingTop: '7%',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',

  },
});

export default HomeScreen;