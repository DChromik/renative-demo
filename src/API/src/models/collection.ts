export type ApiCollection<T> = {
    page: number,
    results: T[],
    total_results: number,
    total_pages: number,
};

export type Collection<T> = {
    page: number,
    results: T[],
    totalResults: number,
    totalPages: number,
};

export const normalizeCollection = <T, U>(modelNormalizer: (model: T) => U) => (
    collection: ApiCollection<T>,
): Collection<U> => ({
    page: collection.page,
    results: (collection.results || []).map(modelNormalizer),
    totalResults: collection.total_results,
    totalPages: collection.total_pages,
});
