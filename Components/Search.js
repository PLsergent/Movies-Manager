import React from "react"
import { StyleSheet, View, TextInput, Button, FlatList, Text, ActivityIndicator } from "react-native"
import MovieItem from './MovieItem'
import { getMovies } from '../API/TMDBApi'
import { connect } from 'react-redux'

class Search extends React.Component {

  constructor(props) {
    super(props)
    this.searchedText = ""
    this.page = 0
    this.totalPages = 0
    this.state = {
      movies: [],
      isLoading: false
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

  _loadMovies() {
    if (this.searchedText.length > 0){
      this.setState({ isLoading: true })
      getMovies(this.searchedText, this.page+1).then(data => {
        this.page = data.page
        this.totalPages = data.total_pages
        this.setState({
          movies: [ ...this.state.movies, ...data.results ],
          isLoading: false
        })
      })
    }
  }

  _searchTextInputChanged(text) {
        this.searchedText = text
  }

  _searchMovies() {
    this.page = 0
    this.totalPages = 0
    this.setState({
      movies: [],
    }, () => {
      this._loadMovies()
    })
  }

  _keyExtractor = (item) => item.id.toString()

  _displayDetailForMovie = (idMovie) => {
    this.props.navigation.navigate("MovieDetails", { idMovie: idMovie })
  }

  _isMovieFavorite(item) {
    return this.props.favoritesMovies.findIndex(
      movie => movie.id === item.id) !== -1 ? true : false
  }

  render() {
    return (
      <View style={styles.main_container}>
        <TextInput style={styles.textinput}
          onSubmitEditing={() => this._searchMovies()}
          placeholder='Movie title'
          onChangeText={(text) => this._searchTextInputChanged(text)}
        />
        <Button title='Search' onPress={() => this._searchMovies()}/>
        <FlatList
            data={this.state.movies}
            keyExtractor={this._keyExtractor}
            extraData={this.props.favoritesMovies}
            renderItem={({item}) =>
              <MovieItem
                movie={item}
                isMovieFavorite={this._isMovieFavorite(item)}
                displayDetailForMovie={this._displayDetailForMovie}
              />
            }
            onEndReachTreshold={0.5}
            onEndReached={() => {
              if (this.page < this.totalPages) {
                this._loadMovies()
              }
            }}
        />
        {this._displayLoading()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  },
  textinput: {
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 5,
    height: 50,
    borderColor: '#000000',
    borderWidth: 1,
    paddingLeft: 5
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

const mapStateToProps = (state) => {
  return {
    favoritesMovies: state.favoritesMovies
  }
}
export default connect(mapStateToProps)(Search)
