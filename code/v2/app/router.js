import {
    createStackNavigator,
    createSwitchNavigator,
    createAppContainer
} from 'react-navigation';
import Home from './components/Home';
import UserList from './components/UserList';
import Login from './components/Login';
import EditProfile from './components/EditProfile';
import UserProfile from './components/UserProfile';
import AuthLoading from './components/AuthLoading';
import Settings from './components/Settings';

const AuthStack = createStackNavigator({
    Login: {
        screen: Login
    },
    EditProfile: {
        screen: EditProfile
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
    UserList: {
        screen: UserList
    },
    EditProfile: {
        screen: EditProfile
    },
    UserProfile: {
        screen: UserProfile
    },
    Settings: {
        screen: Settings
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