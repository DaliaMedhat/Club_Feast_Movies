import React from 'react';

import {
  StyleSheet,
  Text,
  ScrollView,
  View,
} from 'react-native';
import style from '../config/style';


const GenreComponent = (props) => {
  return(
        <View  
        key = {props.id}
        style= {styles.genreLayout}>
        <ScrollView  horizontal>
            {props.data.map( item =>{
              return (
                <View  
                key= {item.id}
                style={styles.genresbox}
                underlayColor={style.underlayColor}>
                    <Text style={styles.genreTextStyle}>{item.name} </Text>
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
    flexGrow: 1,
    flexDirection: 'row',
    alignSelf: 'stretch',
    height: '4%',
    margin: '2%',
  },
  genresbox:{
    backgroundColor: '#D5D5D5',
    marginRight: 6,
    borderRadius: 10,
    padding: 10,
  },
  genreTextStyle:{
    fontWeight: 'bold',
    fontFamily: 'Century Gothic',
    color: 'black',
  },
});
export default GenreComponent;