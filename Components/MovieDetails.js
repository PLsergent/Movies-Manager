import React from 'react'
import { StyleSheet, View, Text, ActivityIndicator, ScrollView } from 'react-native'
import { getMovieDetails } from '../API/TMDBApi'

export default class MovieDetails extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      movie: undefined,
      isLoading : true
    }
  }

  componentDidMount() {
    getMovieDetails(this.props.navigation.state.params.idMovie).then(data => {
      this.setState({
        movie: data,
        isLoading: false
      })
    })
  }

  _displayMovie(){
    const movie = this.state.movie
    if (movie != undefined) {
      return (
        <ScrollView style={styles.scroll_view}>
          <Text>{ movie.title }</Text>
        </ScrollView>
      )
    }
  }

  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
            <ActivityIndicator size='large' />
        </View>
      )
    }
  }

  render() {
    const idMovie = this.props.navigation.state.params.idMovie
    return (
      <View style={styles.main_container}>
        {this._displayMovie()}
        {this._displayLoading()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  scroll_view: {
    flex: 1
  }
})
