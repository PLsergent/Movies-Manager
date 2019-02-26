import React from 'react'
import { StyleSheet, FlatList } from 'react-native'
import MovieItem from './MovieItem'
import { connect } from 'react-redux'

class MovieList extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      movies: []
    }
  }

  _displayDetailForMovie = (idMovie) => {
    this.props.navigation.navigate('MovieDetails', {idMovie: idMovie})
  }

  _isMovieFavorite(item) {
    return this.props.favoritesMovies.findIndex(
      movie => movie.id === item.id) !== -1 ? true : false
  }

  render() {
    return (
        <FlatList
          style={styles.list}
          data={this.props.movies}
          extraData={this.props.favoritesMovies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => (
            <MovieItem
              movie={item}
              isMovieFavorite={this._isMovieFavorite(item)}
              displayDetailForMovie={this._displayDetailForMovie}
            />
          )}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            if (this.props.page < this.props.totalPages) {
              this.props.loadMovies()
            }
          }}
        />
    )
  }
}

const styles = StyleSheet.create({
  list: {
    flex: 1
  }
})

const mapStateToProps = state => {
  return {
    favoritesMovies: state.favoritesMovies
  }
}

export default connect(mapStateToProps)(MovieList)
