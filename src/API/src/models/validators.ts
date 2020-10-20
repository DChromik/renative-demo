import {
    ApiCreatedBy,
    ApiGenre,
    ApiNetwork,
    ApiProductionCompany,
    ApiProductionCountry,
    ApiSeason,
    ApiSpokenLanguage,
} from './common';

export const isCreatedByValid = (createdBy: ApiCreatedBy): createdBy is (
Required<Pick<ApiCreatedBy, 'id' | 'name'>> & Omit<ApiCreatedBy, 'id' | 'name'>) => (
    typeof createdBy.id === 'number' && typeof createdBy.name === 'string'
);

export const isGenreValid = (genre: ApiGenre): genre is Required<ApiGenre> => (
    typeof genre.id === 'string' && typeof genre.name === 'string'
);

export const isNetworkValid = (network: ApiNetwork): network is (
Required<Pick<ApiNetwork, 'id' | 'name'>> & Omit<ApiNetwork, 'id' | 'name'>) => (
    typeof network.id === 'number' && typeof network.name === 'string'
);

export const isProductionCompanyValid = (
    pc: ApiProductionCompany,
): pc is (
Required<Pick<ApiProductionCompany, 'id' | 'name'>>
& Omit<ApiProductionCompany, 'id' | 'name'>
) => (
    typeof pc.id === 'string' && typeof pc.name === 'string'
);

export const isProductionCountryValid = (
    pc: ApiProductionCountry,
): pc is Required<ApiProductionCountry> => (
    typeof pc.iso_3166_1 === 'string' && typeof pc.name === 'string'
);

export const isSeasonValid = (season: ApiSeason): season is (
Required<Pick<ApiSeason, 'id' | 'name'>> & Omit<ApiSeason, 'id' | 'name'>) => (
    typeof season.id === 'number' && typeof season.name === 'string'
);

export const isSpokeLanguageValid = (
    sl: ApiSpokenLanguage,
): sl is Required<ApiSpokenLanguage> => (
    typeof sl.iso_639_1 === 'string' && typeof sl.name === 'string'
);
