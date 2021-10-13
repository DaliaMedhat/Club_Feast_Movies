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
  const [creditsData, setCreditsData] = useState([]);

  const  itemId = route.params;

  useEffect(() => {
    getMovieDetails(JSON.stringify(itemId));
    getMovieCredits(JSON.stringify(itemId));
    
    return () => {
      setData({});
      setGenreData({});
      setCreditsData({});
      
    };
      }, []);

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

  };

  async function getMovieCredits (MovieId) {
    
    var MovieCreditsAPI = 'https://api.themoviedb.org/3/movie/'+ MovieId +'/credits?api_key=4f298a53e552283bee957836a529baec';
    try {
      const response = await fetch(MovieCreditsAPI);
      const json = await response.json();
      setCreditsData(json.cast);
    } 
    catch (error) {
      window.alert('Error');
    }
  };
  
 // getMovieDetails(JSON.stringify(itemId));

  return(
    <SafeAreaView style={styles.container}>
        <View>

        {/* // style={{justifyContent: 'flex-start',flexDirection: 'column'}} */}
          <ScrollView contentContainerStyle={{flex:1}}>
         
          <TouchableOpacity 
              key={data.id} underlayColor='#dddddd'
              onPress={() => navigation.goBack()}> 
              <Text style={styles.backButton}> Back</Text> 
          </TouchableOpacity>

          <Text style={styles.movieTitle}> {data.original_title} </Text>
          <Image
              style={{ width: '70%', height: '60%', alignSelf: 'center'}}
              source={{uri: "https://image.tmdb.org/t/p/w500"+ data.poster_path,}}/>

                   <Text style={styles.title}>Overview</Text> 
                   <Text style={styles.normalInfo}> {data.overview} </Text>
                   <Text style={styles.title}>Genres</Text> 
                   
                   {/* {genreData.map(item => {
                     <Text style={styles.normalInfo}> {item.name} </Text>
                    })} */}
                  <Text style={styles.title}>Credits</Text> 
                  <View  style= {styles.creditsLayout}>
                    <ScrollView  horizontal={true}>
                        {Object.keys(creditsData).map(item => {
                          return (
                            <TouchableOpacity   
                            key={item.id}  
                            underlayColor='#dddddd'>
                                 <Image
                                style={styles.creditsImageStyle}
                                source={{uri: "https://image.tmdb.org/t/p/w500"+ item.profile_path}}/>
                                <Text style={styles.creditsTextStyle}> {item.name}  </Text>
                            </TouchableOpacity>
                          );})}
                          </ScrollView>
                    </View>
          </ScrollView>

        </View>
      </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex:1,
    height: '100%',
    padding: 5,
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
    backgroundColor: '#e0eeee'
  },
  title: {
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
  creditsLayout:{
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingLeft: '2%',
    paddingright: '2%',
    height: '50%'
  },
  backButton: {
    position: 'absolute',
    padding: '2%',
    borderWidth: 3,
    borderStyle: "solid",
    borderColor: "#fff",
    borderRadius: 3,
    fontWeight: 'bold',
    backgroundColor: '#ff7f7f',
    color: 'white',
    fontSize: 16, 
    fontStyle: 'italic',
    fontFamily: 'Century Gothic'},
    
    creditsImageStyle: {
      width: '40%', 
      height: '40%',
      alignSelf: 'center',
      borderRadius: 4,
      borderColor: 'white'},
    
      creditsTextStyle: {
      alignSelf: 'center',
      fontWeight: 'bold',
      fontFamily: 'Century Gothic',
      justifyContent: 'space-evenly'
    }
});

export default MovieDetailsScreen;