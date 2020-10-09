declare namespace NodeJS {
    interface Global {
        HermesInternal?: any;
    }
}

declare module '*.png' {
    const module: any;
    export default module;
}

declare module 'renative';
