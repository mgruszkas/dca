import { Filter, FILTER_TYPE, IFilter } from './index';

export class FilterValidator {
  constructor() {

  }

  public validateRule(filters: IFilter[]): boolean {
    if (filters.length === 1) {
      return false;
    }
    let outputString = '';
    filters.map( (filter) => {
      switch(filter.type) {
        case FILTER_TYPE.HELPER:
          outputString += ` ${filter.value} `;
        break;

        case FILTER_TYPE.FILTER:
          outputString += ' 1 ';
        break;

        case FILTER_TYPE.VALUE:
          outputString += filter.value;
      }
    });

    try {
      eval(outputString);
      return true;
    } catch(e) {
      return false;
    }
  }
}