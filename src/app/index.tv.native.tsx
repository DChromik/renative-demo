import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Home, Modal, MyPage } from '../screens';
import Menu from '../components/menu';

const ModalStack = createStackNavigator();
const TabStack = createMaterialTopTabNavigator();

const TabNavigator = () => (
    <TabStack.Navigator
        tabBar={props => <Menu {...props} />}
        removeClippedSubviews
        swipeEnabled={false}
        timingConfig={{ duration: 0.001 }}
    >
        <TabStack.Screen name="home" component={Home} />
        <TabStack.Screen name="my-page" component={MyPage} />
    </TabStack.Navigator>
);

const App = () => (
    <NavigationContainer>
        <ModalStack.Navigator
            headerMode="none"
            mode="modal"
            screenOptions={{ animationEnabled: false }}
        >
            <ModalStack.Screen name="stack" component={TabNavigator} />
            <ModalStack.Screen name="modal" component={Modal} />
        </ModalStack.Navigator>
    </NavigationContainer>
);

export default App;
