import {
    ApiGenre,
    ApiProductionCompany,
    ApiSpokenLanguage,
    ApiStatus,
    getStatus,
    ProductionCountry,
    SpokenLanguage,
} from './common';
import { Asset, AssetType } from './asset';
import { DEFAULTS } from './defaults';
import {
    isGenreValid,
    isProductionCompanyValid,
    isProductionCountryValid,
    isSpokeLanguageValid,
} from './validators';

export type ApiMovieAsset = Partial<{
    adult: boolean,
    backdrop_path: string | null,
    belongs_to_collection: null | object,
    budget: number,
    genres: ApiGenre[],
    homepage: string | null,
    id: number,
    imdb_id: string | null,
    original_language: string,
    original_title: string,
    overview: string | null,
    popularity: number,
    poster_path: string | null
    production_companies: ApiProductionCompany[],
    production_countries: Partial<{
        iso_3166_1: string,
        name: string,
    }>[],
    release_date: string,
    revenue: number,
    runtime: number | null,
    spoken_languages: ApiSpokenLanguage[];
    status: ApiStatus,
    tagline: string | null,
    title: string,
    video: boolean,
    vote_average: number,
    vote_count: number,
}>;

export type MovieAsset = Asset & {
    _type: AssetType.MOVIE,
    adult: boolean,
    budget: number | null,
    imdbId: string | null,
    productionCountries: ProductionCountry[],
    releaseDate: string | null,
    revenue: number | null,
    runtime: number | null,
    spokenLanguages: SpokenLanguage[],
    tagline: string | null,
    video: boolean,
};

const hasMovieMinimum = (movie: ApiMovieAsset) => (
    typeof movie.id === 'number' && typeof movie.title === 'string'
);

// eslint-disable-next-line complexity
export const normalizeMovie = (movie: ApiMovieAsset): MovieAsset => {
    if (!hasMovieMinimum(movie)) throw new Error('Incomplete movie asset');
    return {
        _type: AssetType.MOVIE,
        adult: movie.adult || false,
        backdropPath: movie.backdrop_path || DEFAULTS.backdropPath,
        budget: movie.budget || null,
        genres: (movie.genres || []).filter(isGenreValid),
        homepage: movie.homepage || null,
        id: movie.id!,
        imdbId: movie.imdb_id || null,
        originalLanguage: movie.original_language || null,
        originalTitle: movie.original_title || null,
        overview: movie.overview || null,
        popularity: movie.popularity || null,
        posterPath: movie.poster_path || DEFAULTS.posterPath,
        productionCompanies: (movie.production_companies || []).filter(isProductionCompanyValid)
            .map(({ id, name, logo_path, origin_country }) => ({
                id,
                name,
                logoPath: logo_path || DEFAULTS.logoPath,
                originCountry: origin_country || null,
            })),
        productionCountries: (movie.production_countries || []).filter(isProductionCountryValid)
            .map(({ iso_3166_1, name }) => ({ name, iso3166_1: iso_3166_1 })),
        releaseDate: movie.release_date || null,
        revenue: movie.revenue || null,
        runtime: movie.runtime || null,
        spokenLanguages: (movie.spoken_languages || []).filter(isSpokeLanguageValid)
            .map(({ iso_639_1, name }) => ({ name, iso639_1: iso_639_1 })),
        status: getStatus(movie.status),
        title: movie.title!,
        tagline: movie.tagline || null,
        video: movie.video || false,
        voteAverage: movie.vote_average || null,
        voteCount: movie.vote_count || null,
    };
};
