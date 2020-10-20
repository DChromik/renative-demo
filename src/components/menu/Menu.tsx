import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { Icon, Button, useNavigate, useOpenDrawer } from 'renative';
import { initNavigation, withFocusable } from '@noriginmedia/react-spatial-navigation';
import Theme, { themeStyles, hasWebFocusableUI } from '../../theme';
import { styles } from './Menu.styles';

if (hasWebFocusableUI) {
    initNavigation({
        debug: false,
        visualDebug: false,
        nativeMode: false,
    });
}

type DrawerProps = any;

export const DrawerButton = (props: DrawerProps) => {
    const openDrawer = useOpenDrawer(props);
    return (
        <Icon
            iconFont="ionicons"
            iconName="md-menu"
            iconColor={Theme.color3}
            size={Theme.iconSize}
            style={themeStyles.icon}
            onPress={() => {
                openDrawer('Drawer');
            }}
        />
    );
};

type MenuProps = {
    setFocus(): void;
};

const MenuComponent = (props: MenuProps) => {
    const navigate = useNavigate(props);
    if (hasWebFocusableUI) {
        useEffect(() => {
            props.setFocus();
        }, []);
    }

    return (
        <View style={styles.container}>
            <Text style={themeStyles.text}>
                Menu
            </Text>
            <Button
                to="/"
                title="Home"
                iconFont="ionicons"
                className="focusable"
                iconName="md-home"
                iconColor={Theme.color3}
                iconSize={Theme.iconSize}
                style={styles.button}
                textStyle={styles.buttonText}
                onPress={() => {
                    navigate('home');
                }}
                onEnterPress={() => {
                    navigate('/');
                }}
            />
            <Button
                to="my-page"
                title="My Page"
                iconFont="ionicons"
                iconName="md-book"
                className="focusable"
                iconColor={Theme.color3}
                iconSize={Theme.iconSize}
                style={styles.button}
                textStyle={styles.buttonText}
                onPress={() => {
                    navigate('my-page');
                }}
                onEnterPress={() => {
                    navigate('my-page');
                }}
            />
            <Button
                to="modal"
                title="My Modal"
                iconFont="ionicons"
                className="focusable"
                iconName="ios-albums"
                iconColor={Theme.color3}
                iconSize={Theme.iconSize}
                style={styles.button}
                textStyle={styles.buttonText}
                onPress={() => {
                    navigate('modal');
                }}
                onEnterPress={() => {
                    navigate('modal');
                }}
            />
        </View>
    );
};

export const Menu = hasWebFocusableUI ? withFocusable()(MenuComponent) : MenuComponent;
