import { CachedAPI } from './cached-fetch';
import { normalizeCollection } from './models/collection';
import { normalizeMovie } from './models/movie-asset';
import { normalizeTv } from './models/tv-asset';
import { withRead } from './with-read';

// const API_KEY = process.env.TMDB_API_KEY || 'Please define env.TMDB_API_KEY';
const API_KEY = 'b91324841c1eb08f85caaa629ab83b9f';
const BASE_URL = 'https://api.themoviedb.org/3/';

export class TmdbAPI {
    fetchApi: CachedAPI = new CachedAPI({
        baseUrl: BASE_URL,
        defaultParams: {
            api_key: API_KEY,
        },
    });

    getMovie(id: number) {
        return this.get(`movie/${id}`, normalizeMovie);
    }

    getTv(id: number) {
        return this.get(`tv/${id}`, normalizeTv);
    }

    getPopularMovies() {
        return this.get('movie/popular', normalizeCollection(normalizeMovie));
    }

    getMoviesByGenre(genres: number | number[]) {
        const withGenres = `with_genres=${typeof genres === 'number' ? genres : genres.join(',')}`;
        return this.get(`discover/movies?${withGenres}`, normalizeCollection(normalizeMovie));
    }

    getPopularTvs() {
        return this.get('tv/popular', normalizeCollection(normalizeTv));
    }

    getTvsByGenre(genres: number | number[]) {
        const withGenres = `with_genres=${typeof genres === 'number' ? genres : genres.join(',')}`;
        return this.get(`discover/tv?${withGenres}`, normalizeCollection(normalizeTv));
    }

    private get<T, U>(
        url: string,
        normalizer: (model: T) => U,
    ) {
        return this.asReadablePromise<U>(
            this.fetch<T>(url).then(normalizer),
        );
    }

    private fetch<T>(url: string) {
        return this.fetchApi.get<T>(url);
    }

    private asReadablePromise<T>(promise: Promise<T>) {
        return withRead(promise);
    }
}

const tmdbApi = new TmdbAPI();

export {
    tmdbApi,
};
