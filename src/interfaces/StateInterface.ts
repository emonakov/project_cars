import { FiltersInterface } from './FiltersInterface';
import { GenericStateInterface } from './GenericStateInterface';

export interface StateInterface extends GenericStateInterface {
    filters: FiltersInterface;
}
