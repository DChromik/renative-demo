import React from 'react';
import { StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { CastButton } from 'react-native-google-cast';
import { Detail, Home, Modal, MyPage, Player } from '../screens';
import { DrawerButton, Menu } from '../components';
import Theme from '../theme';
import { styles } from './index.styles';

type Props = {
    navigation: any;
};

const Stack = createStackNavigator();
const ModalStack = createStackNavigator();
const Drawer = createDrawerNavigator();

const StackNavigator = ({ navigation }: Props) => (
    <Stack.Navigator
        screenOptions={{
            headerTitleStyle: styles.headerTitle,
            headerStyle: styles.header,
            headerTintColor: Theme.color3,
        }}
    >
        <Stack.Screen
            name="home"
            component={Home}
            options={{
                headerLeft: () => <DrawerButton navigation={navigation} />,
                headerRight: () => (
                    <CastButton style={{
                        width: Theme.iconSize,
                        height: Theme.iconSize,
                        // @ts-ignore
                        tintColor: Theme.color3,
                    }}
                    />
                ),
            }}
        />
        <Stack.Screen name="my-page" component={MyPage} />
        <Stack.Screen name="detail" component={Detail} />
        <Stack.Screen name="player" component={Player} />
    </Stack.Navigator>
);

const ModalNavigator = () => (
    <ModalStack.Navigator headerMode="none" mode="modal">
        <ModalStack.Screen name="stack" component={StackNavigator} />
        <ModalStack.Screen name="modal" component={Modal} />
    </ModalStack.Navigator>
);

export const App = () => {
    React.useEffect(() => {
        StatusBar.setBarStyle(Theme.statusBar);
    }, []);
    return (
        <NavigationContainer>
            <Drawer.Navigator drawerContent={Menu}>
                <Drawer.Screen name="drawer" component={ModalNavigator} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
};
