import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { MapAtmCardComponent } from './map-atm-card/map-atm-card.component';
import { MatCardModule } from '@angular/material/card';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { MatDividerModule } from '@angular/material/divider';
import { CustomerViewDialogComponent } from './customer-view-dialog/customer-view-dialog.component';
import { CustomerEditDialogComponent } from './customer-edit-dialog/customer-edit-dialog.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { ViewAccountDialogComponent } from './view-account-dialog/view-account-dialog.component';
import { EditAccountDialogComponent } from './edit-account-dialog/edit-account-dialog.component';
import { ViewAtmCardComponent } from './view-atm-card/view-atm-card.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { OverviewComponent } from './overview/overview.component';
import { RouterModule } from '@angular/router';
import { TransactionsComponent } from './transactions/transactions.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateCustomerComponent,
    CreateAccountComponent,
    MapAtmCardComponent,
    DashboardComponent,
    ConfirmDialogComponent,
    CustomerViewDialogComponent,
    CustomerEditDialogComponent,
    ViewAccountDialogComponent,
    EditAccountDialogComponent,
    ViewAtmCardComponent,
    CustomerListComponent,
    OverviewComponent,
    TransactionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatDividerModule,
    MatGridListModule,


    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      timeOut: 3000
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
