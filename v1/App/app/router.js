import {
    createStackNavigator,
    createSwitchNavigator,
    createAppContainer
} from 'react-navigation';
import Home from './components/Home';
import List from './components/List';
import Login from './components/Login';
import Register from './components/Register';
import AuthLoading from './components/AuthLoading';

const AuthStack = createStackNavigator({
    Login: {
        screen: Login
    },
    Register: {
        screen: Register
    },
}, {
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
});

const AppStack = createStackNavigator({
    Home: {
        screen: Home
    },
    Register: {
        screen: Register
    },
    List: {
        screen: List
    },
}, {
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
});

export const MainRouter = createAppContainer(createSwitchNavigator({
    AuthLoading: AuthLoading,
    App: AppStack,
    Auth: AuthStack,
}, {
    initialRouteName: 'AuthLoading',
}));