import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { IFilter } from './../models/index';

@Injectable()
export class ComunicationProvider {
  public kpis: Subject<IFilter[]> = new Subject<IFilter[]>();
  public addFilter: Subject<IFilter> = new Subject<IFilter>();
  constructor() {

  }
}