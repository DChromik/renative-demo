import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Packshot, Props as PackshotProps } from './Packshot';

type Props = {
    data: PackshotProps[];
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
});

export const List = ({ data }: Props) => (
    <FlatList
        style={styles.container}
        horizontal
        data={data}
        renderItem={({ item: { label } }) => <Packshot label={label} />}
    />
);
