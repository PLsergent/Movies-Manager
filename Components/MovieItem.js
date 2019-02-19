import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import { getImage } from '../API/TMDBApi'

export default class MovieItem extends React.Component {

  render() {
    const { movie, displayDetailForMovie } = this.props

    return (
      <TouchableOpacity
        style={styles.main_container}
        onPress={() => displayDetailForMovie(movie.id)}>
        <Image
         style={styles.image}
         source={{uri: getImage(movie.poster_path)}}
        />
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title_text} numberOfLines={2}>{ movie.title }</Text>
            <Text style={styles.rating}>{ movie.vote_average }</Text>
          </View>
          <View style={styles.description}>
            <Text style={styles.description_text} numberOfLines={5}>{ movie.overview }</Text>
          </View>
          <View style={styles.date}>
            <Text style={styles.date_text}>Release : { movie.release_date }</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    flexDirection: 'row',
    height: 190,
    backgroundColor: '#cceeff',
    marginBottom: 5
  },
  image: {
    width: 120,
    height: 180,
    margin: 5,
    backgroundColor: 'gray'
  },
  content: {
    flex: 1,
    margin: 5
  },
    header: {
      flex: 3,
      flexDirection: 'row',
      alignItems: 'center'
    },
      title_text: {
        flex: 4,
        fontSize: 20,
        flexWrap: 'wrap',
        fontWeight: 'bold'
      },
      rating: {
        textAlign: 'right',
        flex: 1,
        fontSize: 24,
        fontWeight: 'bold',
        color: 'grey'
      },
    description: {
      flex: 6,
      marginTop: 5
    },
      description_text: {
        fontSize: 16,
        fontStyle: 'italic'
      },
    date:{
      flex: 1,
      marginBottom: 3
    },
      date_text: {
        textAlign: 'right'
      }
})
