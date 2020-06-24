import { useState, useEffect } from 'react';

import { CarInterface } from '../interfaces/CarInterface';
import { getStorageValue, setStorageValue, removeStorageValue } from '../utils/storage';

const getFavCars = (): CarInterface[] => getStorageValue('favCars') ?? [];
const isFavCar = (car: CarInterface): boolean => {
    const favCars = getFavCars();

    return Boolean(favCars.find((favCar) => favCar.stockNumber === car.stockNumber));
};

const saveFavCar = (car: CarInterface): void => {
    const favCars = getFavCars();

    if (!isFavCar(car)) {
        setStorageValue('favCars', [
            ...(favCars && [...favCars]),
            car,
        ]);
    }
};

const removeFavCar = (car: CarInterface): void => {
    const favCars = getStorageValue('favCars');
    const filteredFavCars = favCars.filter((favCar: CarInterface) => favCar.stockNumber !== car.stockNumber);

    setStorageValue('favCars', filteredFavCars);
};

const useFavorites = () => {
    const [favCars, setCars] = useState<CarInterface[]>([]);

    useEffect(() => {
        const carsFromStorage = getFavCars();
        if (carsFromStorage) {
            if (carsFromStorage.length === 0) {
                removeStorageValue('favCars');
            } else {
                setCars(carsFromStorage);
            }
        }
    }, []);

    const storeFavCar = (favCar: CarInterface) => {
        const newCars = [...favCars, { ...favCar }];
        setCars(newCars);
        saveFavCar(favCar);
    };

    const removeCarFromFav = (car: CarInterface) => {
        const newCars = favCars.filter((favCar) => car.stockNumber !== favCar.stockNumber);
        setCars(newCars);
        removeFavCar(car);
    };

    return {
        favCars,
        storeFavCar,
        removeCarFromFav,
        isFavCar,
    };
};

export default useFavorites;
