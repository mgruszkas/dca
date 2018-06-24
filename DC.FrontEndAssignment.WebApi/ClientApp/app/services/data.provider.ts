import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { IFilter, FilterValidator } from './../models/index';

export interface IChartDataSet {
  label: string;
  data: any[];
  backgroundColor?: string;
  borderColor?: string;
}

export interface IChartData {
  labels: string[];
  datasets: IChartDataSet[]
}


@Injectable()
export class DataProvider {
  private validator = new FilterValidator();
  private _availableYears: number[] = [];
  constructor(private http: Http) {

  }

  public async getAvgPropertyValue(filters: IFilter[] = []): Promise<IChartData> {
    //let years = await this.getAvailableYears();
    return this.getAverageOriginalPropertyValueByYear().map( (d) => this.getDataSet('loanOriginationYear', filters, d)).toPromise();
  }

  public async getAggResByYear(filters: IFilter[] = []): Promise<IChartData> {
    //let years = await this.getAvailableYears();
    return this.getAggregatedResultByYear().map( (d) => this.getDataSet('loanOriginationYear', filters, d)).toPromise();
  }

  public getAvailableYears(reload = false): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      if (this._availableYears.length && !reload) {
        resolve(this._availableYears);
      } else {
        this.getAverageOriginalPropertyValueByYear().subscribe((data: any[]) => {
          data.map((e) => {
            this._availableYears.push(e.loanOriginationYear);
          });
          resolve(this._availableYears);
        }, (error => reject(error)));
      }
    });
  }

  public getAvailableKPIs(): Promise<any> {
    return this.getAggregatedResultByYear().map( (d) => {
      let translated = this.translateData(d,[]);
      return Object.keys(translated);
    }).toPromise();
  }

  private getAggregatedResult(): Observable<any> {
    return this.http.get(`/api/aggregatedResult`).map(data => data.json());
  }

  private getAggregatedResultByYear(): Observable<any> {
    return this.http.get(`/api/aggregatedResultByYear`).map(data => data.json());
  }

  private getAverageIndexedLTFVByYear(): Observable<any> {
    return this.http.get(`/api/averageIndexedLTFVByYear`).map(data => data.json());
  }

  private getAverageOriginalPropertyValueByYear(): Observable<any> {
    return this.http.get(`/api/averageOriginalPropertyValueByYear`).map(data => data.json());
  }

  private translateData(input: any[], filters: IFilter[]) {
    let returnObj: Object = {};
    input.map( (e, i) => {
        if (filters.length) {
          if (!this.validator.validate(e, filters)){
            return;
          }
        }
        Object.keys(e).map( (key) => {
            if(!returnObj.hasOwnProperty(key)) {
                returnObj[key] = [];
            }
            returnObj[key].push(input[i][key]);
        });
    })
    return returnObj;
}

private  getDataSet(keyIndex, filters: IFilter[], input: any): IChartData {
    let data = this.translateData(input, filters);
    let dataSets: IChartDataSet[] = [];
    let indexes: any[] = data[keyIndex];
    delete data[keyIndex];

    Object.keys(data).forEach( (e) => {
        dataSets.push({
            label: e,
            data: data[e]
        });
    })

    return {
        labels: indexes,
        datasets: dataSets
    }
  }
}