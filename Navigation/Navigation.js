import { createStackNavigator, createAppContainer } from 'react-navigation'
import Search from '../Components/Search'
import MovieDetails from '../Components/MovieDetails'

const SearchStackNavigator = createStackNavigator({
  Search: {
    screen: Search,
    navigationOptions: {
      headerTitle: 'Search  '
    }
  },
  MovieDetails: {
    screen: MovieDetails
  }
})

export default createAppContainer(SearchStackNavigator)
