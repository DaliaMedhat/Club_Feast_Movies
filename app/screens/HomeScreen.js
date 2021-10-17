import React, {useState, useEffect} from 'react';

import { useNavigation } from '@react-navigation/native';
import MovieComponent from '../components/MovieComponent';
import app from '../config/app';
import style from '../config/style';

import {
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Dimensions,
  Platform
} from 'react-native';
import GenreComponent from '../components/GenreComponent';
// import {vw, vh, vmin, vmax} from 'react-native-viewport-units';
const HomeScreen = () => {
  
  const [isLoading, setisLoading] = useState(false);
  const [data, setData] = useState([]);
  const [filter, setfilter] = useState('upcoming');
  const navigation = useNavigation();

  // var  {vw, vh, vmin, vmax} = require('react-native-viewport-units');

  const getGenres = async () => {
    const url = app.getGenreAPI + app.APIkey;
    try {
      const res = await fetch(url);
      const json = await res.json();
      return json.genres;
    } catch (e) {
      console.log(e);
    }
  }

  const getMovieList = async (filter) => {
    const api = `https://api.themoviedb.org/3/movie/${filter}` + app.APIkey;
    try {
      setisLoading(true);
      setfilter(filter);
      const res = await fetch(api);
      const {results} = await res.json();
      const genres = await getGenres();
      
      if (results.length > 0) {
        results.map(movie => {
          if (movie.genre_ids.length > 0 && genres.length > 0) {
            movie.genres = movie.genre_ids.map((id) => 
            genres.find((genre) => genre.id === id))
          }
          return movie;
        });
      }
      setData(results);
    } catch (e) {
      console.log(e);
    }
    finally{
      setisLoading(false);
      
  }
  };

  useEffect(() => {
    getMovieList('upcoming');

    return () => {
    };
  }, []);

  // async function getList (type) {
  //   var MoviesAPI = app.upcoming + app.APIkey;
  //   try {
  //     setisLoading(true);
  //     if (type === "upcoming") {
  //        MoviesAPI = app.upcoming + app.APIkey;
  //     }
  //     else if (type === "popular") {
  //        MoviesAPI = app.popular + app.APIkey;
  //     } else {
  //        MoviesAPI = app.top_rated + app.APIkey;
  //     }
  //     const response = await fetch(MoviesAPI);
  //     const json = await response.json();
  //     setData(json.results);
  //   } 
  //   catch (error) {
  //     window.alert('Error List');
  //     setisLoading(false);
  //   }
  //   finally{
  //     setisLoading(false);
  //   }
  // };

  return (
    <SafeAreaView style={styles.container}>
        
      <View style={styles.buttonsContainer}>
         <TouchableOpacity
          style={filter==='upcoming'? styles.pressedButton : styles.button}
          onPress={() => getMovieList('upcoming')}>
          <Text style={filter==='upcoming'?styles.pressedText:{fontSize:16}}>Upcoming</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={filter==='popular'? styles.pressedButton : styles.button}
          onPress={(() => getMovieList('popular'))}>
          <Text style={filter==='popular'?styles.pressedText:{fontSize:16}}>Popular</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={filter==='top_rated'? styles.pressedButton : styles.button}
          onPress={(() => getMovieList("top_rated"))}>
          <Text style={filter==='top_rated'?styles.pressedText:{fontSize:16}}>Top Rated</Text>
        </TouchableOpacity>
      
      </View>

      { isLoading &&
      <View style={style.activityIndicator}>
      <ActivityIndicator size="large"  /> 
      </View>
      }

      {!isLoading && 
        <View >
        <ScrollView>
          {data.map(item => {
            return (
              <TouchableOpacity   
              style = {styles.moviesContainer}
              key={item.id} 
              underlayColor={style.underlayColor}
              onPress={() => navigation.navigate("Movie Details", item.id) }
              >
                <View >
                  
                  <MovieComponent 
                    poster_path= {app.URIimage+item.poster_path}
                    original_title = {item.original_title}
                    release_date = {item.release_date}
                    vote_average = {item.vote_average}
                    genre = {item.genres && item.genres.length > 0 &&
                      <View style = {styles.movieGenres}>
                            {item.genres.map(x =>{
                              return(
                                <View 
                                key={x.id}  
                                style={styles.genreLayout}>
                                    <Text style={styles.genreTextStyle}>{x.name}</Text>
                                  </View>
                                  );
                                })
                              }
                            </View>
                          }
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
    padding: 5,
    paddingBottom:'20%'
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
    backgroundColor: style.underlayColor,
    alignItems: 'center',
  },
  pressedButton: {
    width: '30%',
    padding: 10,
    margin: 5,
    color: 'white',
    borderRadius: 10,
    backgroundColor: 'green',
    alignItems: 'center',
  },
  pressedText:{
    color:'white',
    fontSize:16,
    fontFamily: Platform.OS==='android'?'Robto':'Helvetica',
  },
  moviesContainer: {
    height: Dimensions.get('window').height/3,
    width: '100%',
    marginBottom: '2%',
    borderRadius: 15,
    shadowColor: 'grey',
    shadowOffset: {width: 1, height: 3},
    shadowOpacity: 0.26,
    elevation: 12,
 
  },
  movieGenres:
  {
    width: 3*Dimensions.get('screen').width/6,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  genreLayout:
  {
    height: '100%',
    marginTop: 10,
  },
  genreTextStyle:{
    flexDirection: 'row',
    marginRight: 6,
    padding: '3%',
    textAlign: 'center',
    borderRadius: 15,
    backgroundColor: '#D5D5D5',
    fontWeight: 'bold',
    fontFamily: Platform.OS==='android'?'Robto':'Helvetica',
  },

  
});

export default HomeScreen;