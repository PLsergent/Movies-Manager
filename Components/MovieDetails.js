import React from 'react'
import { StyleSheet,
         View,
         Text,
         ActivityIndicator,
         ScrollView,
         Image,
         TouchableOpacity,
         Share,
         Platform
       } from 'react-native'
import { getMovieDetails, getImage } from '../API/TMDBApi'
import numeral from 'numeral'
import moment from 'moment'
import { connect } from 'react-redux'
import EnlargeShrink from '../Animations/EnlargeShrink'

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
    if (favoriteMovieIndex !== -1) { // Movie déjà dans nos favoris, on a déjà son détail
      // Pas besoin d'appeler l'API ici, on ajoute le détail stocké dans notre state global au state de notre component
      this.setState({
        movie: this.props.favoritesMovies[favoriteMovieIndex],
        isLoading: false
      })
      return
    }
    // Le movie n'est pas dans nos favoris, on n'a pas son détail
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
    var sourceImage = require('../assets/images/favorite_border.png')
    var shouldEnlarge = false
    if (this.props.favoritesMovies.findIndex(item => item.id === this.state.movie.id) !== -1) {
      sourceImage = require('../assets/images/favorite.png')
      shouldEnlarge = true
    }
    return (
      <EnlargeShrink
        shouldEnlarge={shouldEnlarge}>
        <Image
          style={styles.favorite_image}
          source={sourceImage}
        />
      </EnlargeShrink>
    )
  }

  _shareMovie() {
    const { movie } = this.state
    Share.share({ title: movie.title, message: movie.overview })
  }

  _displayActionButton() {
    const { movie } = this.state
    if (movie != undefined && Platform.OS === 'android') {
      return (
        <TouchableOpacity
          style={styles.share_touchable_button}
          onPress={() => this._shareMovie()}>
          <Image
            style={styles.share_image}
            source={require('../assets/images/share.png')} />
        </TouchableOpacity>
      )
    }
  }

  render() {
    const idMovie = this.props.navigation.state.params.idMovie
    return (
      <View style={styles.main_container}>
        {this._displayMovie()}
        {this._displayLoading()}
        {this._displayActionButton()}
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
  favorite_image:{
    flex: 1,
    width: null,
    height: null
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
  },
  share_touchable_button: {
    position: 'absolute',
    width: 60,
    height: 60,
    right: 30,
    bottom: 30,
    borderRadius: 30,
    backgroundColor: '#4286f4',
    justifyContent: 'center',
    alignItems: 'center'
  },
  share_image: {
    width: 30,
    height: 30
  }
})

const mapStateToProps = (state) => {
  return {
    favoritesMovies: state.favoritesMovies
  }
}
export default connect(mapStateToProps)(MovieDetails)
