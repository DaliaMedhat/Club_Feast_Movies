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
  ActivityIndicator
} from 'react-native';
import GenreComponent from '../components/GenreComponent';

const HomeScreen = () => {
  const [isLoading, setisLoading] = useState(false);
  const [data, setData] = useState([]);
  const [genresData, setGenresData] = useState([]);
  const navigation = useNavigation();
 
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
      setGenresData([]);
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
          style={styles.button}
          onPress={() => getMovieList('upcoming')}>
          <Text style={styles.buttonText}>Upcoming</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={(() => getMovieList('popular'))}>
          <Text style={styles.buttonText}>Popular</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={(() => getMovieList("top_rated"))}>
          <Text style={styles.buttonText}>Top Rated</Text>
        </TouchableOpacity>
      
      </View>

      { isLoading &&
      <View style={style.activityIndicator}>
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
              key={item.id} 
              underlayColor={style.underlayColor}
              onPress={() => navigation.navigate("Movie Details", item.id) }
              >
                <View>
                  
                  <MovieComponent 
                    poster_path= {app.URIimage+item.poster_path}
                    original_title = {item.original_title}
                    release_date = {item.release_date}
                    vote_average = {item.vote_average}
                    genre = {item.genres && item.genres.length > 0 &&
                            <View style={styles.genreLayout}>
                            {item.genres.map(x =>{
                              return(
                                // <View style={styles.genreLayout}>
                                  <TouchableWithoutFeedback    
                                    key={x.id}  
                                    underlayColor={style.underlayColor}>
                                    <Text style={styles.genreTextStyle}>{x.name}</Text>
                                  </TouchableWithoutFeedback >
                                  
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
    flexDirection: 'row',
    justifyContent: "flex-start",
    width:'70%',
    height: '190%',
    paddingBottom: '62%',
    
  },
  genreLayout:
  {
    // margin: '1%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    margin: 2
    // flexWrap: 'wrap',
  },
  genreTextStyle:{
    fontWeight: 'bold',
    fontFamily: 'Century Gothic',
    borderWidth: 2,
    borderRadius: 10,
    color: 'black',
    backgroundColor: '#D5D5D5',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    alignSelf: 'center',
    marginRight: 2,
    marginLeft: 2,
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