export interface CarInterface {
    stockNumber: string;
    manufacturerName: string;
    modelName: string;
    color: string;
    mileage: {
        number: number;
        unit: string;
    };
    fuelType: string;
    pictureUrl: string;
}
