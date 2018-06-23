import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { ChipsModule } from 'primeng/primeng';
import { ChartModule } from 'primeng/chart';

import { DataProvider } from './services/data.provider';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        HomeComponent
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
            { path: '**', redirectTo: 'home' }
        ])
    ],
    providers: [
        DataProvider
    ]
})
export class AppModuleShared {
}
