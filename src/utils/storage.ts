import { CarInterface } from '../interfaces/CarInterface';

const { localStorage: storage } = window;

export const getStorageValue = (key: string): any => {
    const val = storage.getItem(key) as string;

    return JSON.parse(val);
};
export const setStorageValue = (key: string, val: any): void => storage.setItem(key, JSON.stringify(val));
export const removeStorageValue = (key: string): void => storage.removeItem(key);

export const getFavCars = (): CarInterface[] => getStorageValue('favCars') ?? [];
export const isFavCar = (car: CarInterface): boolean => {
    const favCars = getFavCars();

    return Boolean(favCars.find((favCar) => favCar.stockNumber === car.stockNumber));
};

export const saveFavCar = (car: CarInterface): void => {
    const favCars = getFavCars();

    if (!isFavCar(car)) {
        setStorageValue('favCars', [
            ...(favCars && [...favCars]),
            car,
        ]);
    }
};

export const removeFavCar = (car: CarInterface): void => {
    const favCars = getStorageValue('favCars');
    const filteredFavCars = favCars.filter((favCar: CarInterface) => favCar.stockNumber !== car.stockNumber);

    setStorageValue('favCars', filteredFavCars);
};
