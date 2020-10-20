import React from 'react';
import { FlatList, ListRenderItem, StyleSheet } from 'react-native';
import { tmdbApi } from 'tmdb-api';
import { MovieAsset } from 'tmdb-api/src/models/movie-asset';
import { Packshot } from './Packshot';

const popularMovies = tmdbApi.getPopularMovies();

type Props = {};

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
});

const renderPackshot: ListRenderItem<MovieAsset> = ({ item }) => (
    <Packshot
        label={item.title}
        backdrop={item.backdropPath}
    />
);

export const List = () => {
    const movies = popularMovies.read();

    return (
        <FlatList
            style={styles.container}
            horizontal
            data={movies.results}
            renderItem={renderPackshot}
        />
    );
};
