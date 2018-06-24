import { Component, OnInit } from '@angular/core';
import { DataProvider, IChartData, IChartDataSet, ComunicationProvider } from './../../services/index';
import { FILTER_TYPE, IFilter, Filter, FilterValidator } from './../../models/index';


@Component({
    selector: 'home',
    styleUrls: ['./home.component.scss'],
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit{
    public getAggResByYear: IChartData = null;
    public averageIndexedLTFVByYear: IChartData = null;
    public availableKPIs: IFilter[] = [];
    public filters: any[] = [];
    public validator = new FilterValidator();
    public valid: boolean = true;
    constructor(private data: DataProvider, private comunicationProvider: ComunicationProvider){
        this.comunicationProvider.addFilter.subscribe( (filter) => {
            this.filters.push(filter);
            
            this.valid = this.validator.validateRule(this.filters);
            console.log('result ', this.valid);
            if (this.valid) {
                this.getData(this.filters); 
            }
        });
    }

    public async ngOnInit() {
       await this.getData();

        this.data.getAvailableKPIs().then( d => {
            this.availableKPIs = d.map( (kpi) => {
                return new Filter({ 
                    type: FILTER_TYPE.FILTER,
                    value: kpi
                } as IFilter);
            });
            this.comunicationProvider.kpis.next(this.availableKPIs);
        });
        
    }

    public onRemove(): void {
        this.valid = this.validator.validateRule(this.filters);
        if (this.valid) {
            this.getData(this.filters);
        }
    }

    public onAdd(item): void {
        // disable cusom text
        this.filters = this.filters.splice(0, 1);
    }

    public async getData(filters: IFilter[] = []) {
        this.getAggResByYear = await this.data.getAggResByYear(filters);
        this.averageIndexedLTFVByYear = await this.data.getAvgPropertyValue(filters);

        console.log(this.getAggResByYear, this.averageIndexedLTFVByYear);
    }
    
}
