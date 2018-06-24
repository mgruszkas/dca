import { Component, Input, Output } from '@angular/core';
import { ComunicationProvider } from './../../services/index';
import { PRE_DEFINED_FILTER_HELPERS, Filter, FILTER_TYPE, IFilter } from './../../models/index';

@Component({
    selector: 'nav-menu',
    templateUrl: './navmenu.component.html',
    styleUrls: ['./navmenu.component.scss']
})
export class NavMenuComponent {
    public kpis: IFilter[] = [];
    public customValue: number = null;
    public preDefinedHelpers = PRE_DEFINED_FILTER_HELPERS.map( f => new Filter(f));
    constructor(private comunicationService: ComunicationProvider) {
        this.comunicationService.kpis.subscribe( (kpis: IFilter[]) => {
            this.kpis = kpis;
        })
    }

    public addFilter(kpi: IFilter): void {
        this.comunicationService.addFilter.next(kpi);
    }

    public addCustomValue(): void {
        this.comunicationService.addFilter.next(new Filter({
            type: FILTER_TYPE.VALUE,
            value: this.customValue
        }));
        this.customValue = null;
    }
}
