import React, {useState, useEffect} from 'react';
import { Dimensions } from 'react-native';

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
    getMovieCredits(JSON.stringify(itemId));
    
    return () => {
      setData({});
      setGenreData([]);
      setCreditsData([]);
      
    };
      }, []);

  async function getMovieDetails (MovieId) {
    
    var MovieDetailsAPI = 'https://api.themoviedb.org/3/movie/'+ MovieId +'?api_key=4f298a53e552283bee957836a529baec';
    try {
      setisLoading(true);
      const response = await fetch(MovieDetailsAPI);
      const json = await response.json();
      setData(json);
      setGenreData(json.genres);
    } 
    catch (error) {
      window.alert('Error');
    }
    finally{
      setisLoading(false);
    }
  };

  async function getMovieCredits (MovieId) {
    
    var MovieCreditsAPI = 'https://api.themoviedb.org/3/movie/'+ MovieId +'/credits?api_key=4f298a53e552283bee957836a529baec';
    try {
      setisLoading(true);
      const response = await fetch(MovieCreditsAPI);
      const json = await response.json();
      setCreditsData(json.cast);
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
          <TouchableOpacity 
              key={data.id} underlayColor='#dddddd'
              onPress={() => navigation.goBack()}> 
              <Text style={styles.backButton}> Back</Text> 
          </TouchableOpacity>

          { isLoading &&
            <View style={{flex:1,justifyContent:'center',alignContent:'center'}}>
            <ActivityIndicator size="large" /> 
            </View>
          }
          
          {!isLoading&&
          
        <View style={{paddingTop:'10%'}}>
          <ScrollView>
          <Text style={styles.movieTitle}> {data.original_title} </Text>
           
          <Image
             style={{ height: win.height/2,
              width: 362 * ratio, alignSelf: 'center'}}
              source={{uri: "https://image.tmdb.org/t/p/w500"+ data.poster_path,}}/>

                   <Text style={styles.title}>Overview</Text> 
                   <Text style={styles.normalInfo}> {data.overview} </Text>
                  
                  <Text style={styles.title}>Genres</Text> 
                  <View  style= {styles.genreLayout}>

                    <ScrollView  horizontal={true}>
                        {genreData.map( item => {
                          return (
                            <TouchableOpacity   
                            key={item.id}  
                            underlayColor='#dddddd'>
                                <Text style={styles.genreTextStyle}> {item.name}  </Text>
                            </TouchableOpacity>
                          );
                        }
                          )}
                      </ScrollView>
                  </View>


                  <Text style={styles.title}>Credits</Text> 

                  <View  style= {styles.creditsLayout}>

                    <ScrollView  horizontal={true}>
                        {creditsData.map( item => {
                          return (
                                (<TouchableWithoutFeedback   
                                key={item.id}  
                                underlayColor='#dddddd'>
                                <View>
                                <Image
                                style={styles.creditsImageStyle}
                                source={item.profile_path!==null?{uri: "https://image.tmdb.org/t/p/w500"+ item.profile_path}
                                :{uri: "https://eitrawmaterials.eu/wp-content/uploads/2016/09/person-icon.png"}}/>

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