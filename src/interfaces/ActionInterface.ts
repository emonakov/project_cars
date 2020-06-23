import { FiltersInterface } from './FiltersInterface';
import { GenericStateInterface } from './GenericStateInterface';

interface PayloadInterface extends GenericStateInterface {
    filters?: FiltersInterface;
}

export interface ActionInterface {
    type: string;
    payload: PayloadInterface;
}
