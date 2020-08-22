export const typedFetch = async <T>(input: RequestInfo, init?: RequestInit): Promise<T> => {
    try {
        const response = await fetch(input, init);
        const data = response.json();
        return data as Promise<T>;
    } catch (e) {
        throw e;
    }
};