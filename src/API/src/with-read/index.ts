/* eslint-disable @typescript-eslint/no-throw-literal */
enum PromiseStatus {
    PENDING, RESOLVED, REJECTED,
}

export type ReadablePromise<T> = {
    read: () => T,
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const isReady = <T>(status: PromiseStatus, result: T | null): result is T => (
    status === PromiseStatus.RESOLVED
);

export const withRead = <T>(promise: Promise<T>): ReadablePromise<T> => {
    let status: PromiseStatus = PromiseStatus.PENDING;

    let result: T | null = null;

    let caught: any = null;

    promise.then((value: T) => {
        result = value;
        status = PromiseStatus.RESOLVED;
    }).catch((reason: any) => {
        caught = reason;
        status = PromiseStatus.REJECTED;
    });

    const read = () => {
        if (isReady(status, result)) return result;
        if (status === PromiseStatus.REJECTED) throw caught;
        throw promise;
    };

    return {
        read,
    };
};
