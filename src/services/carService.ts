import axios from 'redaxios';

export const fetchCar = (callback: Function, stockId: string): void => {
    axios.get(`/api/cars/${stockId}`)
        .then((response) => JSON.parse(response.data))
        .then(({ car }) => callback(car))
        .catch((err) => callback(null, err));
};
