import { Cache } from './Cache';

type Params = Record<string, string>;

type Config = {
    baseUrl: string,
    defaultParams?: Params,
};

type CacheConfig = {
    doNotCache?: boolean,
    timeout?: number,
};

type PendingPromise<T> = {
    resolve: (value?: T | PromiseLike<T> | undefined) => void,
    reject: (reason?: any) => void,
};

export class CachedAPI {
    cache: Cache = new Cache();

    baseUrl: string;

    defaultParams: Params;

    pendingRequests: Record<string, PendingPromise<any>[]> = {};

    constructor({ baseUrl, defaultParams = {} }: Config) {
        this.baseUrl = baseUrl;
        this.defaultParams = defaultParams;
    }

    get<T>(
        url: string,
        params: Params = {},
        options: RequestInit = {},
        { doNotCache = false, timeout }: CacheConfig = {},
    ): Promise<T> {
        if (!doNotCache && this.cache.hasKey(url)) Promise.resolve(this.cache.get(url));
        const shouldFetch = this.shouldFetch(url);
        const promise = this.addPendingRequest<T>(url);
        if (shouldFetch) {
            this.fetch<T>(url, params, { ...options, method: 'GET' }).then((data: T) => {
                if (!doNotCache) this.cache.add(url, data, { timeout });
                const pendingRequests = this.pendingRequests[url];
                pendingRequests.forEach(({ resolve }) => resolve(data));
                this.removePendingRequests(url);
            });
        }
        return promise;
    }

    post<T>(url: string, params: Params = {}, options: RequestInit = {}) {
        return this.fetch<T>(url, params, { ...options, method: 'POST' });
    }

    private fetch<T>(url: string, urlParams: Params, options?: RequestInit): Promise<T> {
        const allParams = { ...this.defaultParams, ...urlParams };
        const params = new URLSearchParams();
        Object.entries(allParams).forEach(([key, value]) => {
            params.append(key, value);
        });
        const fetchUrl = `${this.baseUrl}${url}?${params.toString()}`;
        return fetch(fetchUrl, options).then((response: Response) => {
            const data = response.json();
            return data;
        });
    }

    private shouldFetch(url: string) {
        const noPendingRequests = typeof this.pendingRequests[url] === 'undefined';
        if (noPendingRequests) this.pendingRequests[url] = [];
        return noPendingRequests;
    }

    private addPendingRequest<T>(url: string) {
        return new Promise<T>((resolve, reject) => {
            this.pendingRequests[url].push({ resolve, reject });
        });
    }

    private removePendingRequests(url: string) {
        delete this.pendingRequests[url];
    }
}
