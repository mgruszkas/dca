import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataProvider, IChartData, IChartDataSet, ComunicationProvider } from './../../services/index';
import { FILTER_TYPE, IFilter, Filter, FilterValidator, DEMO_FILTERS } from './../../models/index';

const ROUTE_PARAM = 'chart';
const DEFAULT_CHART = 'getAggResByYear';

@Component({
    selector: 'home',
    styleUrls: ['./home.component.scss'],
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit{
    public chartData: IChartData = null;
    public availableKPIs: IFilter[] = [];
    public filters: any[] = [];
    public validator = new FilterValidator();
    public valid: boolean = true;
    public chartDoShow: string = DEFAULT_CHART;
    constructor(private data: DataProvider, private comunicationProvider: ComunicationProvider, private route: ActivatedRoute, private router: Router){
        this.comunicationProvider.addFilter.subscribe( (filter) => {
            this.filters.push(filter);
            this.valid = this.validator.validateRule(this.filters);
            if (this.valid) {
                this.getData(this.chartDoShow, this.filters); 
            }
        });

        this.route.params.subscribe( (params) => {
            if (!params.hasOwnProperty(ROUTE_PARAM)) {
                this.router.navigateByUrl(`/home/${DEFAULT_CHART}`);
            } else {
                this.chartDoShow = params[ROUTE_PARAM];
                this.getData(this.chartDoShow, this.filters); 
            }
        })
    }

    public async ngOnInit() {
        this.prepareDemoFilters();
        await this.getData(this.filters);
        
    }

    public prepareDemoFilters(): void {
        this.filters = DEMO_FILTERS.map( d => new Filter(d));
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

    public async getData(chartToShow, filters: IFilter[] = []) {
        switch(this.chartDoShow){
            default:
            case 'getAggResByYear':
                this.chartData = await this.data.getAggResByYear(filters);
            break;

            case 'getAvgIndLTFVByYear':
                this.chartData = await this.data.getAvgIndLTFVByYear(filters);
            break;

            case 'getAvgOrigPropValByYear':
                this.chartData = await this.data.getAvgOrigPropValByYear(filters);
            break;
        }
        
        this.availableKPIs = this.chartData.availableFilters.map( (kpi) => {
            return new Filter({ 
                type: FILTER_TYPE.FILTER,
                value: kpi
            } as IFilter);
        });
        this.comunicationProvider.kpis.next(this.availableKPIs);
    }
    
}
