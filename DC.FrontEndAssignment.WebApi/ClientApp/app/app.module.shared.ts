import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FilteringComponent } from './components/filtering/filtering.component';
import { ChipsModule } from 'primeng/primeng';
import { ChartModule } from 'primeng/chart';

//providers
import { DataProvider, ComunicationProvider } from './services/index'

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        HomeComponent,
        FilteringComponent
    ],
    imports: [
        ChartModule,
        ChipsModule,
        CommonModule,
        HttpModule,
        FormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'home/:chart', component: HomeComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ],
    providers: [
        DataProvider,
        ComunicationProvider
    ]
})
export class AppModuleShared {
}
