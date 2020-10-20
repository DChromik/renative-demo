import {
    ApiCreatedBy,
    ApiGenre,
    ApiNetwork,
    ApiProductionCompany,
    ApiSeason,
    CreatedBy,
    getStatus,
    Network,
    Season,
} from './common';
import { Asset, AssetType } from './asset';
import {
    isCreatedByValid,
    isGenreValid,
    isNetworkValid,
    isProductionCompanyValid,
    isSeasonValid,
} from './validators';
import { DEFAULTS } from './defaults';

export type ApiTvAsset = Partial<{
    backdrop_path: string | null,
    created_by: ApiCreatedBy[],
    episode_run_time: number[],
    first_air_date: string,
    genres: ApiGenre[],
    homepage: string,
    id: number,
    in_production: boolean,
    languages: string[],
    last_air_date: string,
    last_episode_to_air: Partial<{
        air_date: string,
        episode_number: number,
        id: number,
        name: string,
        overview: string,
        production_code: string,
        season_number: number,
        show_id: number,
        still_path: string,
        vote_average: number,
        vote_count: number,
    }>
    name: string,
    next_episode_to_air: null,
    networks: ApiNetwork[],
    number_of_episodes: number,
    number_of_seasons: number,
    origin_country: string[],
    original_language: string,
    original_name: string,
    overview: string,
    popularity: number,
    poster_path: string | null,
    production_companies: ApiProductionCompany[],
    seasons: ApiSeason[],
    status: string,
    type: string,
    vote_average: number,
    vote_count: number,
}>;

export type TvAsset = Asset & {
    _type: AssetType.TV,
    createdBy: CreatedBy[],
    episodeRunTime: number[],
    firstAirDate: string | null,
    inProduction: boolean,
    languages: string[],
    lastAirDate: string | null,
    networks: Network[],
    numberOfEpisodes: number | null,
    numberOfSeasons: number | null,
    originCountry: string[],
    seasons: Season[],
    tvStatus: string | null,
    type: string | null,
};

const hasMinimumTv = (tv: ApiTvAsset) => (
    typeof tv.id === 'number' && typeof tv.name === 'string'
);

// eslint-disable-next-line complexity
export const normalizeTv = (tv: ApiTvAsset): TvAsset => {
    if (!hasMinimumTv(tv)) throw new Error('Incomplete TV asset');
    return {
        _type: AssetType.TV,
        backdropPath: tv.backdrop_path || DEFAULTS.backdropPath,
        createdBy: (tv.created_by || []).filter(isCreatedByValid).map((cb) => ({
            id: cb.id,
            creditId: cb.credit_id || null,
            name: cb.name,
            gender: cb.gender || null,
            profilePath: cb.profile_path || null,
        })),
        episodeRunTime: tv.episode_run_time || [],
        firstAirDate: tv.first_air_date || null,
        genres: (tv.genres || []).filter(isGenreValid),
        homepage: tv.homepage || null,
        id: tv.id!,
        inProduction: tv.in_production || false,
        languages: tv.languages || [],
        lastAirDate: tv.last_air_date || null,
        networks: (tv.networks || []).filter(isNetworkValid).map((network) => ({
            name: network.name,
            id: network.id,
            logoPath: network.logo_path || DEFAULTS.logoPath,
            originCountry: network.origin_country || null,
        })),
        numberOfEpisodes: tv.number_of_episodes || null,
        numberOfSeasons: tv.number_of_seasons || null,
        originCountry: tv.origin_country || [],
        originalLanguage: tv.original_language || null,
        originalTitle: tv.original_name || null,
        overview: tv.overview || null,
        popularity: tv.popularity || null,
        posterPath: tv.poster_path || DEFAULTS.posterPath,
        productionCompanies: (tv.production_companies || []).filter(isProductionCompanyValid)
            .map(({ id, name, logo_path, origin_country }) => ({
                id,
                name,
                logoPath: logo_path || DEFAULTS.logoPath,
                originCountry: origin_country || null,
            })),
        seasons: (tv.seasons || []).filter(isSeasonValid).map((season) => ({
            airDate: season.air_date || null,
            episodeCount: season.episode_count || null,
            id: season.id,
            name: season.name,
            overview: season.overview || null,
            posterPath: season.poster_path || DEFAULTS.posterPath,
            seasonNumber: season.season_number || null,
        })),
        status: getStatus(tv.status),
        title: tv.name!,
        tvStatus: tv.status || null,
        type: tv.type || null,
        voteAverage: tv.vote_average || null,
        voteCount: tv.vote_count || null,
    };
};
