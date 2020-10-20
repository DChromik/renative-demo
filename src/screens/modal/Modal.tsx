import React, { useEffect } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Button, usePop } from 'renative';
import { withFocusable } from '@noriginmedia/react-spatial-navigation';
import Theme, { themeStyles, hasWebFocusableUI } from '../../theme';
import { styles } from './Modal.styles';

type Props = {
    setFocus(id: string): void;
};

const ScreenModal = (props: Props) => {
    const pop = usePop(props);
    if (hasWebFocusableUI) {
        useEffect(() => {
            const { setFocus } = props;
            setFocus('close');

            return function cleanup() {
                setFocus('menu');
            };
        }, []);
    }
    return (
        <View style={themeStyles.screenModal}>
            <View style={styles.header}>
                <Button
                    focusKey="close"
                    iconFont="ionicons"
                    iconName="md-close-circle"
                    className="focusable"
                    iconColor={Theme.color3}
                    iconSize={Theme.iconSize}
                    style={themeStyles.icon}
                    to="/"
                    onEnterPress={() => {
                        pop();
                    }}
                    onPress={() => {
                        pop();
                    }}
                />
            </View>
            <ScrollView contentContainerStyle={themeStyles.container}>
                <Text style={themeStyles.textH2}>This is my Modal!</Text>
            </ScrollView>
        </View>
    );
};

export const Modal = hasWebFocusableUI ? withFocusable()(ScreenModal) : ScreenModal;
