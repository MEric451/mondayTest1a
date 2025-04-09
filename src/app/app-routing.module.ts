import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { AccountListComponent } from './account-list/account-list.component';
import { MapAtmCardComponent } from './map-atm-card/map-atm-card.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AtmCardTransactionFormComponent } from './atm-card-transaction-form/atm-card-transaction-form.component';
import { AtmCardTransactionListComponent } from './atm-card-transaction-list/atm-card-transaction-list.component';
import { AtmCardFormComponent } from './atm-card-form/atm-card-form.component';

const routes: Routes = [

  { path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'create-customer', component: CreateCustomerComponent },
      { path: 'customers', component: CustomerListComponent },
      { path: 'create-account', component: CreateAccountComponent },
      { path: 'accounts', component: AccountListComponent },
      { path: 'map-atm-card', component: MapAtmCardComponent },
      { path: 'mapped-cards', component: AtmCardFormComponent },
      { path: 'atm-transactions', component: AtmCardTransactionListComponent },
      { path: 'atm-card-transaction-form', component: AtmCardTransactionFormComponent },
      { path: '', redirectTo: 'customers', pathMatch: 'full' }
    ]
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
