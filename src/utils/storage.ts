const { localStorage: storage } = window;

export const getStorageValue = (key: string): any => {
    const val = storage.getItem(key) as string;

    return JSON.parse(val);
};
export const setStorageValue = (key: string, val: any): void => storage.setItem(key, JSON.stringify(val));
export const removeStorageValue = (key: string): void => storage.removeItem(key);
