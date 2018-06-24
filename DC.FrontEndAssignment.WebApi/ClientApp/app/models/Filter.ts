export enum FILTER_TYPE {
  FILTER = 1,
  HELPER = 2,
  VALUE = 3
};

export interface IFilter {
  type: FILTER_TYPE;
  value: any;
};


export const PRE_DEFINED_FILTER_HELPERS: IFilter[] = [
  { type: FILTER_TYPE.HELPER, value: '('}, 
  { type: FILTER_TYPE.HELPER, value: ')'},
  { type: FILTER_TYPE.HELPER, value: '<'},
  { type: FILTER_TYPE.HELPER, value: '>'}, 
  { type: FILTER_TYPE.HELPER, value: '&&'}, 
  { type: FILTER_TYPE.HELPER, value: '||'}
];


export class Filter {
  public type;
  public value;
  constructor(data: IFilter) {
    this.type = data.type;
    this.value = data.value;
  }

  public toString() {
    return this.value;
  }
}