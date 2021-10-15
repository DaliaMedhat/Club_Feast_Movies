import React, {useState, useEffect} from 'react';
import { Dimensions } from 'react-native';
import app from '../config/app';
import style from '../config/style';

import {
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableWithoutFeedback
} from 'react-native';
import GenreComponent from '../components/GenreComponent';

const MovieDetailsScreen = ({route,navigation}) =>{
  const [data, setData] = useState([]);
  const [genreData, setGenreData] = useState([]);
  const [creditsData, setCreditsData] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  const  itemId = route.params;
  const win = Dimensions.get('window');
  const ratio = win.width/541;

  useEffect(() => {
    getMovieDetails(JSON.stringify(itemId));
    
    return () => {
      setData({});
      setGenreData([]);
      setCreditsData([]);
      
    };
      }, []);

  async function getMovieDetails (MovieId) {
    
    var MovieDetailsAPI = app.movieDetails + MovieId + app.APIkeyCreditsAppended;
    try {
      setisLoading(true);
      const response = await fetch(MovieDetailsAPI);
      const json = await response.json();
      setData(json);
      setCreditsData(json.credits.cast);
      setGenreData(json.genres);
    } 
    catch (error) {
      window.alert('Error');
    }
    finally{
      setisLoading(false);
    }
  };
  
  return(
    <SafeAreaView style={styles.container}>
          { isLoading &&
            <View style={style.activityIndicator}>
            <ActivityIndicator size="large" /> 
            </View>
          }
          
          {!isLoading&&
          
        <View>
          <ScrollView>
          <Text style={styles.movieTitle}> {data.original_title} </Text>

          <Image
             style= {styles.moviePoster}
             source={{uri: app.URIimage+ data.poster_path,}}/>

                  <Text style={styles.ratingText}> {data.vote_average*10}% </Text>
                   <Text style={styles.title}>Overview</Text> 
                   <Text style={styles.normalInfo}> {data.overview} </Text>
                  
                  <Text style={styles.title}>Genres</Text> 
                  <GenreComponent data = {genreData} 
                  />

                  <Text style={styles.title}>Credits</Text> 

                  <View  style= {styles.creditsLayout}>

                    <ScrollView  horizontal={true}>
                        {creditsData.map( item => {
                          return (
                                (<TouchableWithoutFeedback   
                                key={item.id}  
                                underlayColor={style.underlayColor}>
                                <View>
                                <Image
                                style={styles.creditsImageStyle}
                                source={item.profile_path!==null?{uri: app.URIimage+ item.profile_path}
                                :{uri: app.URInullCredits}}/>

                                <Text style={styles.creditsTextStyle}> {item.name}  </Text>
                                </View>
                                </TouchableWithoutFeedback>)
                          );}
                          )}
                          </ScrollView>
                    </View>
          </ScrollView>
        </View>
        }
      </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex:1,
    padding: 5,
  },
  moviePoster:{
    height:  Dimensions.get('window').height/2,
    width: 362 *  Dimensions.get('window').width/541,
    alignSelf: 'center',
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
    backgroundColor: '#e0eeee'
  },
  title: {
    marginTop: '3%',
    padding: '2%',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Century Gothic',
    backgroundColor: '#e0eeee'
    // alignSelf:'left',
  },
  normalInfo: {
    fontSize: 16,
    fontFamily: 'Century Gothic',
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
  creditsLayout:{
    flexGrow:1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingLeft: '2%',
    paddingright: '2%',
  },
  creditsImageStyle: {
      height: Dimensions.get('window').height/8,
      width: 362 * Dimensions.get('window').width/1541,
      alignSelf: 'center',
      borderRadius: 20,
      flexDirection: 'row',
      justifyContent: 'space-evenly'
  },
  creditsTextStyle: {
      alignSelf: 'center',
      fontWeight: 'bold',
      fontFamily: 'Century Gothic',
      flexDirection: 'row',
      justifyContent: 'space-evenly'
  },
  ratingText:{
    fontSize: 20,
    color: 'green',
    alignSelf: 'center',
    padding: '3%',
    fontWeight:'bold'

  },
  backButton: {
    position: 'absolute',
    padding: '2%',
    borderWidth: 3,
    borderStyle: "solid",
    borderColor: "#fff",
    borderRadius: 3,
    fontWeight: 'bold',
    backgroundColor: '#959595',
    color: 'white',
    fontSize: 16, 
    fontStyle: 'italic',
    fontFamily: 'Century Gothic'
  },
});

export default MovieDetailsScreen;