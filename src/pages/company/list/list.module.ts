import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompanyListPage } from './list';

@NgModule({
  declarations: [
    CompanyListPage,
  ],
  imports: [
    IonicPageModule.forChild(CompanyListPage),
  ],
})
export class CompanyListPageModule {}
