import axios from 'redaxios';

export const fetchFilters = (callback: Function): void => {
    const manufacturersUrl = '/api/manufacturers';
    const colorsUrl = '/api/colors';

    Promise.all([axios.get(manufacturersUrl), axios.get(colorsUrl)])
        .then(([res1, res2]) => [JSON.parse(res1.data), JSON.parse(res2.data)])
        .then(([{ manufacturers }, { colors }]) => callback({ manufacturers, colors }));
};

export const fetchCarsWithFilters = (callback: Function, options: any[]): void => {
    const carsUrl = options
        .filter(([, paramValue]) => Boolean(paramValue))
        .reduce((acc, [paramKey, paramValue]) => `${acc}&${paramKey}=${paramValue}`, '/api/cars?');

    axios.get(carsUrl)
        .then((response) => callback(JSON.parse(response.data)));
};
