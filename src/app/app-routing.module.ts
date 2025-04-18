import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { MapAtmCardComponent } from './map-atm-card/map-atm-card.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { OverviewComponent } from './overview/overview.component';
import { TransactionsComponent } from './transactions/transactions.component';

const routes: Routes = [

  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'overview', component: OverviewComponent },
      { path: 'create-customer', component: CreateCustomerComponent }, 
      { path: 'customers', component: CustomerListComponent },
      { path: 'create-account', component: CreateAccountComponent },
      { path: 'map-atm-card', component: MapAtmCardComponent },
      { path: 'transactions', component: TransactionsComponent },
      { path: '', redirectTo: 'overview', pathMatch: 'full' }
    ]
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
