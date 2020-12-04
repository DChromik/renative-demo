import React from 'react';
import { Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { getScaledValue } from 'renative';
import theme from '../theme';

const makeImageUrl = (path: string) => `https://image.tmdb.org/t/p/w500${path}`;

export type Props = {
    label: string;
    poster: string;
    onPress?: () => void;
};

const styles = StyleSheet.create({
    container: {
        width: 120,
        height: 200,
        margin: 10,
        borderWidth: getScaledValue(2),
        borderColor: theme.color3,
    },
    image: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    text: {
        position: 'absolute',
        bottom: 0,
        paddingVertical: 5,
        textAlign: 'center',
        width: '100%',
        fontFamily: theme.primaryFontFamily,
        fontSize: 20,
        color: theme.color2,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});

export const Packshot = ({ label, poster, onPress }: Props) => (
    <TouchableOpacity
        style={styles.container}
        onPress={onPress}
    >
        <Image
            style={styles.image}
            source={{ uri: makeImageUrl(poster) }}
        />
        <Text
            style={styles.text}
        >
            {label}
        </Text>
    </TouchableOpacity>
);
