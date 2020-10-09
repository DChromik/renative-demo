import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Packshot } from './packshot';

const DATA = [
    { label: 'Item 1' },
    { label: 'Item 2' },
    { label: 'Item 3' },
]

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
});

export const List = () => {
    return <FlatList
        style={styles.container}
        horizontal
        data={DATA} 
        renderItem={({ item: { label } }) => {
            return <Packshot label={label} />;
        }}
    />;
}