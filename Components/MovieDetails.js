import React from 'react'
import { StyleSheet, View, Text, ActivityIndicator, ScrollView, Image, TouchableOpacity } from 'react-native'
import { getMovieDetails, getImage } from '../API/TMDBApi'
import numeral from 'numeral'
import moment from 'moment'
import { connect } from 'react-redux'

class MovieDetails extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      movie: undefined,
      isLoading : true
    }
  }

  componentDidMount() {
    const favoriteMovieIndex = this.props.favoritesMovies.findIndex(
      item => item.id === this.props.navigation.state.params.idMovie
    )
    if (favoriteMovieIndex !== -1) { // Film déjà dans nos favoris, on a déjà son détail
      // Pas besoin d'appeler l'API ici, on ajoute le détail stocké dans notre state global au state de notre component
      this.setState({
        movie: this.props.favoritesMovies[favoriteMovieIndex],
        isLoading: false
      })
      return
    }
    // Le film n'est pas dans nos favoris, on n'a pas son détail
    // On appelle l'API pour récupérer son détail
    this.setState({ isLoading: true })
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
          <Image
           style={styles.image}
           source={{uri: getImage(movie.backdrop_path)}}
          />
          <Text style={styles.title_movie}>{ movie.title }</Text>
          <TouchableOpacity
              style={styles.favorite_container}
              onPress={() => this._toggleFavorite()}>
              {this._displayFavoriteImage()}
          </TouchableOpacity>
          <Text style={styles.description_movie}>{ movie.overview }</Text>
          <Text style={styles.informations_movie}>Release: { moment( movie.release_date ).format('L') }</Text>
          <Text style={styles.informations_movie}>Rating: { movie.vote_average } / 10</Text>
          <Text style={styles.informations_movie}>Number of vote: { movie.vote_count }</Text>
          <Text style={styles.informations_movie}>Budget: {numeral(movie.budget).format('0,0')}$</Text>
          <Text style={styles.informations_movie}>
            { movie.genres.length > 1 ? 'Genres' : 'Genre' }
            : { movie.genres.map((genre) => genre.name).join(" / ")}
          </Text>
          <Text style={styles.informations_movie}>
            { movie.production_companies.length > 1 ? 'Companies' : 'Company' }
            : { movie.production_companies.map((company) => company.name).join(" / ")}
          </Text>
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

  _toggleFavorite() {
    const action = { type: "TOGGLE_FAVORITE", value: this.state.movie}
    this.props.dispatch(action)
  }

  _displayFavoriteImage() {
    var sourceImage = require ('../assets/images/favorite_border.png')
    if (this.props.favoritesMovies.findIndex(item => item.id === this.state.movie.id) !== -1) {
      sourceImage = require('../assets/images/favorite.png')
    }
    return (
      <Image
        style={styles.favorite_image}
        source={sourceImage}
      />
    )
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
    backgroundColor: '#dbe8ff'
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
  },
    image: {
    height: 169,
    margin: 5
  },
  title_movie: {
    backgroundColor: '#f2f7ff',
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 8,
    flex: 1,
    flexWrap: 'wrap'
  },
  favorite_container: {
    alignItems: 'center'
  },
  favorite_image: {
    width: 40,
    height: 40
  },
  description_movie: {
    color: '#636262',
    fontSize: 18,
    fontStyle: 'italic',
    margin: 5,
    marginBottom: 10,
    textAlign: 'justify'
  },
  informations_movie: {
    fontSize: 18,
    marginLeft: 5
  }
})

const mapStateToProps = (state) => {
  return {
    favoritesMovies: state.favoritesMovies
  }
}
export default connect(mapStateToProps)(MovieDetails)
