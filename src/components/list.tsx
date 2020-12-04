/* eslint-disable react/prop-types */
import React from 'react';
import { FlatList, ListRenderItem, StyleSheet } from 'react-native';
import { tmdbApi } from 'tmdb-api';
import { MovieAsset } from 'tmdb-api/src/models/movie-asset';
import { Packshot } from './Packshot';

const popularMovies = tmdbApi.getPopularMovies();

type Props = {
    onPackshotPress: () => void;
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
});

const renderPackshot = (onPress: () => void): ListRenderItem<MovieAsset> => ({ item }) => (
    <Packshot
        label={item.title}
        poster={item.posterPath}
        onPress={onPress}
    />
);

export const List = (props: Props) => {
    const movies = popularMovies.read();
    const { onPackshotPress } = props;

    return (
        <FlatList
            style={styles.container}
            horizontal
            data={movies.results}
            renderItem={renderPackshot(onPackshotPress)}
        />
    );
};
