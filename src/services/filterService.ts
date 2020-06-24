import axios from 'redaxios';

import { buildApiUrl } from '../utils/api';

export const fetchFilters = (callback: Function): Promise<any> => {
    const manufacturersUrl = buildApiUrl('api/manufacturers');
    const colorsUrl = buildApiUrl('api/colors');

    return Promise.all([axios.get(manufacturersUrl), axios.get(colorsUrl)])
        .then(([res1, res2]) => [JSON.parse(res1.data), JSON.parse(res2.data)])
        .then(([{ manufacturers }, { colors }]) => callback({ manufacturers, colors }));
};

export const fetchCarsWithFilters = (callback: Function, options: any[]): Promise<any> => {
    const carsUrl = options
        .filter(([, paramValue]) => Boolean(paramValue))
        .reduce((acc, [paramKey, paramValue]) => `${acc}&${paramKey}=${paramValue}`, 'api/cars?');

    return axios.get(buildApiUrl(carsUrl))
        .then((response) => callback(JSON.parse(response.data)));
};
