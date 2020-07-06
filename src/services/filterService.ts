import axios from 'redaxios';

import { buildApiUrl } from '../utils/api';

export const fetchFilters = async (): Promise<any> => {
    const manufacturersUrl = buildApiUrl('api/manufacturers');
    const colorsUrl = buildApiUrl('api/colors');

    const [manResponse, colResponse] = await Promise.all([axios.get(manufacturersUrl), axios.get(colorsUrl)]);
    const [{ manufacturers }, { colors }] = [JSON.parse(manResponse.data), JSON.parse(colResponse.data)];

    return { manufacturers, colors };
};

export const fetchCarsWithFilters = async (options: any[]): Promise<any> => {
    const carsUrl = options
        .filter(([, paramValue]) => Boolean(paramValue))
        .reduce((acc, [paramKey, paramValue]) => `${acc}&${paramKey}=${paramValue}`, 'api/cars?');

    const { data } = await axios.get(buildApiUrl(carsUrl));

    return JSON.parse(data);
};
