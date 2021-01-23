import axios from 'redaxios';

import { buildApiUrl } from '../utils/api';

export const fetchCar = async (stockId: string): Promise<any> => {
    const { data } = await axios.get(buildApiUrl(`api/cars/${stockId}`));
    const { car } = JSON.parse(data);

    return car;
};
