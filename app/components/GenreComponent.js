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
                <TouchableWithoutFeedback   
                key={item.id}  
                underlayColor={style.underlayColor}>
                    <Text style={styles.genreTextStyle}> {item.name}  </Text>
                </TouchableWithoutFeedback>
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
});
export default GenreComponent;