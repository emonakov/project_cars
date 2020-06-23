export interface CarInterface {
    stockNumber: number | string;
    manufacturerName: string;
    modelName: string;
    color: string;
    mileage: {
        number: number | string;
        unit: string;
    }
    fuelType: string;
    pictureUrl: string;
}
