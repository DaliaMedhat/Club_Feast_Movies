import React from 'react';

import {
  Image,
  StyleSheet,
  Text,
  ScrollView,
  View,
  TouchableWithoutFeedback, 
  
} from 'react-native';
import app from '../config/app';
import style from '../config/style';


const GenreComponent = (props) => {
  return(
        <View  style= {styles.genreLayout}>
        <ScrollView  horizontal={true}>
            {props.data.map( item => {
              return (
                <View   
                      style={styles.genresbox}
                      underlayColor={style.underlayColor}>
                      <Text style={styles.genreTextStyle}> {item.name}  </Text>
                  </View>
              );
            }
              )}
          </ScrollView>
        </View>
  )
}
const styles = StyleSheet.create({
  genreLayout:
  {
    flexGrow:1,
    flexDirection: 'row',
    margin: '3%',
    // flexWrap:'wrap',
    // flexDirection: 'row',
    // padding: '2%',
  },
  genresbox:{
    // flexGrow:1,
    backgroundColor: '#D5D5D5',
    padding:'2%',
    marginRight: 6,
    borderRadius: 10,
  },
  genreTextStyle:{
    fontWeight: 'bold',
    fontFamily: 'Century Gothic',
    color: 'black',
  },
});
export default GenreComponent;