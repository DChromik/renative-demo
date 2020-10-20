const ONE_HOUR = 3600000;

type Config = {
    timeout: number,
};

const DEFAULT_CONFIG: Config = {
    timeout: ONE_HOUR,
};

export class Cache {
    private timeout: number;

    private data: Record<string, Object> = {};

    private timeoutIds: Record<string, number> = {};

    constructor(passedConfig: Partial<Config> = {}) {
        const config = { ...DEFAULT_CONFIG, ...passedConfig };
        this.timeout = config.timeout;
    }

    add(url: string, data: Object, { timeout = this.timeout }: Partial<Config> = {}) {
        if (this.data[url]) this.invalidate(url);
        this.data[url] = data;
        this.timeoutIds[url] = window.setTimeout(() => {
            delete this.timeoutIds[url];
            this.invalidate(url);
        }, timeout);
    }

    invalidate(url: string) {
        this.clearTimeout(url);
        delete this.data[url];
    }

    clear() {
        while (Object.keys(this.timeoutIds).length > 0) {
            const url = Object.keys(this.timeoutIds)[0];
            this.clearTimeout(url);
        }
        this.data = {};
    }

    hasKey(url: string) {
        return typeof this.data[url] !== 'undefined';
    }

    get(url: string) {
        return this.data[url];
    }

    private clearTimeout(url: string) {
        const timeout = this.timeoutIds[url];
        if (typeof timeout !== 'number') return;
        window.clearTimeout(timeout);
        delete this.timeoutIds[url];
    }
}
