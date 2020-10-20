export enum Status {
    RUMORED,
    PLANNED,
    IN_PRODUCTION,
    POST_PRODUCTION,
    RELEASED,
    CANCELED,
    UNKNOWN,
}

export type ApiCreatedBy = Partial<{
    id: number,
    credit_id: number | null,
    name: string,
    gender: number | null,
    profile_path: string,
}>;

export type CreatedBy = {
    id: number,
    creditId: number | null,
    name: string,
    gender: number | null,
    profilePath: string | null,
};

export type ApiGenre = Partial<{
    id: number,
    name: string,
}>;

export type Genre = {
    id: number,
    name: string,
};

export type ApiNetwork = Partial<{
    name: string,
    id: number,
    logo_path: string,
    origin_country: string,
}>;

export type Network = {
    name: string,
    id: number,
    logoPath: string,
    originCountry: string | null,
};

export type ApiProductionCompany = Partial<{
    id: number,
    logo_path: string | null,
    name: string,
    origin_country: string,
}>;

export type ProductionCompany = {
    id: number,
    logoPath: string,
    name: string,
    originCountry: string | null,
};

export type ApiProductionCountry = Partial<{
    iso_3166_1: string,
    name: string,
}>;

export type ProductionCountry = {
    iso3166_1: string,
    name: string,
};

export type ApiSeason = Partial<{
    air_date: string,
    episode_count: number,
    id: number,
    name: string,
    overview: string,
    poster_path: string,
    season_number: number,
}>;

export type Season = {
    airDate: string | null,
    episodeCount: number | null,
    id: number,
    name: string,
    overview: string | null,
    posterPath: string | null,
    seasonNumber: number | null,
};

export type ApiStatus = (
    'Rumored' | 'Planned' | 'In Production' | 'Post Production' | 'Released' | 'Canceled'
);

export type ApiSpokenLanguage = Partial<{
    iso_639_1: string,
    name: string,
}>;

export type SpokenLanguage = {
    iso639_1: string,
    name: string,
};

export const getStatus = (status: ApiStatus | string | undefined) => {
    switch (status) {
        case 'Rumored': return Status.RUMORED;
        case 'Planned': return Status.PLANNED;
        case 'In Production': return Status.IN_PRODUCTION;
        case 'Post Production': return Status.POST_PRODUCTION;
        case 'Released': return Status.RELEASED;
        case 'Canceled': return Status.CANCELED;
        default: return Status.UNKNOWN;
    }
};
