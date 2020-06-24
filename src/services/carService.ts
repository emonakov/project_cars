import axios from 'redaxios';

import { buildApiUrl } from '../utils/api';

export const fetchCar = (
    callback: Function, stockId: string,
): Promise<any> => axios.get(buildApiUrl(`api/cars/${stockId}`))
    .then((response) => JSON.parse(response.data))
    .then(({ car }) => callback(car))
    .catch((err) => callback(null, err));
