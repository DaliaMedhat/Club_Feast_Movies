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
} from 'react-native';

const HomeScreen = () => {
  const [isLoading, setisLoading] = useState(false);
  const [data, setData] = useState([]);
  const [genresData, setGenresData] = useState([]);
  const [allGenresData, setallGenresData] = useState([]);
  const [mounted, setMounted] = useState('')
 
  const navigation = useNavigation();

  async function getGenre(id) {
      try {
        const GenreAPI = "https://api.themoviedb.org/3/movie/"+id+"?api_key=4f298a53e552283bee957836a529baec";
        // const GenreAPI =
        // 'https://api.themoviedb.org/3/genre/movie/list?api_key=4f298a53e552283bee957836a529baec';
        const genreResponse = await fetch(GenreAPI);
        const genreJson = await genreResponse.json();
        setGenresData(genreJson.genres);
        setisLoading(true);
      //   const genresForMovie = genresData.map((item) =>
      //   setallGenresData([...allGenresData,item.name])
      // );
      // console.log(id);
      // console.log(allGenresData);
      // console.log(genreJson.genres[0].name);
      }
      catch(error){
        window.alert("errorGenre")
      }
      finally{
        setisLoading(false);
      }
  };

  async function getList (type) {
    var MoviesAPI = 'https://api.themoviedb.org/3/movie/upcoming?api_key=4f298a53e552283bee957836a529baec';
    try {
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
      setisLoading(true);
      // const genresList = data.map((item) =>
      //   getGenre(item.id)
      // );
      // getGenre(580489);
      
    } 
    catch (error) {
      window.alert('Error');
    }
    finally{
      setisLoading(false);
    }
  };


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

      {/* <View style={styles.moviesContainer}> */}
        <View >
        <ScrollView >

          {isLoading && <Text style={styles.button}> Loading ...</Text>}
          {data.map(item => {
            
            return (
             
                <TouchableOpacity   style = {styles.moviesContainer}
                                    key={item.id} underlayColor='#dddddd'
                                    onPress={() => navigation.navigate("Movie Details", item.id) }
                                    >
                                    
                  <View style={styles.moviePosters}>
                    <Image
                      style={{ width: '70%', height: '70%'}}
                      source={{uri: "https://image.tmdb.org/t/p/w500"+ item.poster_path,}}/>

                        <View style={styles.textContainer}>
                            <Text style={styles.buttonText}> {item.original_title}</Text>   
                            <Text style={styles.detailsText}> Release Date: {item.release_date}</Text>
                            <Text style={styles.voteAverageStyle}> Rating: {item.vote_average}</Text>
                        </View>
                    </View>

                {/* {genresData.map(genre =>{
                  (getGenre(item.id)),
                  
                  <Text style={styles.buttonText}>{genre.name}</Text>
                })
              } */}

              </TouchableOpacity>
            );
          })}
             
        </ScrollView> 


        
      {/* <ScrollView>
        <FlatList
          data={data}
          nestedScrollEnabled
          renderItem={({item}) =>
          (
            <View> 
          <Text style={styles.buttonText}>{item.original_title}</Text>
          <FlatList
          data={genresData}
          nestedScrollEnabled
          renderItem={({genre}) => (
            getGenre(item.id),
            <Text style={styles.buttonText}>{genre.name}</Text>
          )}
          keyExtractor={item => item.id}
          /> 
          </View>
        )}
          keyExtractor={item => item.id}
        />
         
          {/* </FlatList> */}
      </View>
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
    marginTop: '10%',
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
    // paddingTop: '20%'
  },
  moviesContainer: {
    display: 'flex',
    flex:1,
    flexWrap: 'wrap',
    // flexGrow:1,
    flexDirection: 'column',
    justifyContent: "space-evenly",
    width: '70%',
    height: '100%',
    // paddingTop: '20%',
  },

  moviePosters: {
    // paddingTop: '40%',
    flexDirection: 'row',
    justifyContent: "flex-start",
    width:'70%',
    height: '190%',
    paddingBottom: '62%',
    
  },
  textContainer:{
    width: '100%',
    height: '100%',
    flexWrap: 'wrap',
    paddingLeft: '7%',
    flexDirection: 'column',
    paddingTop: '7%',
    justifyContent: 'flex-start',

  },
});

export default HomeScreen;