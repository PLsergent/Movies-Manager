import React from 'react'
import { StyleSheet, Image } from 'react-native'
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation'
import Search from '../Components/Search'
import MovieDetails from '../Components/MovieDetails'
import Favorites from '../Components/Favorites'
import Test from '../Components/Test'

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

const FavoriteStackNavigator = createStackNavigator({
  Favorites: {
    screen: Favorites,
    navigationOptions: {
      headerTitle: 'Favorites                   '
    }
  },
  MovieDetails: {
    screen: MovieDetails
  }
})

const MoviesTabNavigator = createBottomTabNavigator({
  Search: {
    screen: SearchStackNavigator,
    navigationOptions: {
      tabBarIcon: () => {
        return <Image
          source={require('../assets/images/search.png')}
          style={styles.icon}/>
      }
    }
  },
  Favorites: {
    screen: FavoriteStackNavigator,
    navigationOptions: {
      tabBarIcon: () => {
        return <Image
          source={require('../assets/images/favorite.png')}
          style={styles.icon}/>
      }
    }
  },
  Test: {
    screen: Test,
  }
}, {
  tabBarOptions: {
    activeBackgroundColor: '#DDDDDD',
    inactiveBackgroundColor: '#FFFFFF',
    showLabel: false,
    showIcon: true
  }
})

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30
  }
})

export default createAppContainer(MoviesTabNavigator)
