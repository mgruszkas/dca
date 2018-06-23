import { Component, OnInit } from '@angular/core';
import { DataProvider, IChartData, IChartDataSet } from './../../services/data.provider';



@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit{
    public getAggResByYear: IChartData = null;
    public averageIndexedLTFVByYear: IChartData = null;
    constructor(private data: DataProvider){
        
    }

    public async ngOnInit() {
        this.data.getAggResByYear().then( d => this.getAggResByYear = d);
        this.data.getAvgPropertyValue().then( d => this.averageIndexedLTFVByYear = d);
    }

    
    
}
