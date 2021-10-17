import React, {useState, useEffect} from 'react';
import { Dimensions } from 'react-native';
import app from '../config/app';
import style from '../config/style';

import {
  SafeAreaView,
  ScrollView,
  Image,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Platform
} from 'react-native';
import GenreComponent from '../components/GenreComponent';

const MovieDetailsScreen = ({route,navigation}) =>{
  const [data, setData] = useState([]);
  const [genreData, setGenreData] = useState([]);
  const [creditsData, setCreditsData] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  const  itemId = route.params;
  const win = Dimensions.get('window');

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
          <Image
             style= {styles.moviePoster}
             source={{uri: app.URIimage+ data.poster_path,}}/>
          <Text style={styles.movieTitle}> {data.original_title} </Text>


                  <Text style={styles.ratingText}> {data.vote_average*10}% </Text>
                   <Text style={styles.title}>Overview</Text> 
                   <Text style={styles.normalInfo}> {data.overview} </Text>
                  
                  <Text style={styles.title}>Genres</Text> 
                  <GenreComponent data = {genreData}/>

                  <Text style={styles.title}>Credits</Text> 

                  <View  style= {styles.creditsLayout}>

                    <ScrollView  horizontal={true}>
                        {creditsData.map( item => {
                          return (
                                (<TouchableWithoutFeedback   
                                key={item.id}  
                                >
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
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: '4%',
  },
  movieTitle: {
    padding: '1%',
    margin: '3%',
    alignSelf:'center',
    borderRadius: 3,
    color: 'black',
    fontSize: 22,
    fontWeight: 'bold',
    fontFamily: Platform.OS==='android'?'Robto':'Helvetica',
  },
  title: {
    marginTop: '3%',
    padding: '2%',
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: Platform.OS==='android'?'Robto':'Helvetica',
  },
  normalInfo: {
    padding: '2%',
    textAlign: 'justify',
    fontSize: 16,
    fontFamily: Platform.OS==='android'?'Robto':'Helvetica',
  },
  creditsLayout:{
    flexGrow:1,
    flexDirection: 'row',
    paddingLeft: '3%',
    paddingright: '3%',
    justifyContent: 'center'
  },
  creditsImageStyle: {
      height: Dimensions.get('window').height/8,
      width: 362 * Dimensions.get('window').width/1541,
      flexDirection: 'row',
      borderRadius: 50,
      justifyContent: 'space-evenly',
      alignSelf: 'center',
      marginLeft: '0.5%'
  },
  creditsTextStyle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width:  362 * Dimensions.get('window').width/1441,
    alignSelf: 'center',
    fontWeight: 'bold',
    fontFamily: Platform.OS==='android'?'Robto':'Helvetica',
  },
  ratingText:{
    alignSelf: 'center',
    fontSize: 20,
    color: 'green',
    padding: '2%',
    fontWeight:'bold',
    fontFamily: Platform.OS==='android'?'Robto':'Helvetica',
  },

});

export default MovieDetailsScreen;