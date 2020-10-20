import { Genre, ProductionCompany, Status } from './common';

export enum AssetType {
    MOVIE, TV
}

export type Asset = {
    backdropPath: string,
    genres: Genre[],
    homepage: string | null,
    id: number,
    originalLanguage: string | null,
    originalTitle: string | null,
    overview: string | null,
    popularity: number | null,
    posterPath: string,
    productionCompanies: ProductionCompany[],
    status: Status,
    title: string,
    voteAverage: number | null,
    voteCount: number | null,
};
