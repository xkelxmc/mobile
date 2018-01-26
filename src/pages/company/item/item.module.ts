import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompanyItemPage } from './item';

@NgModule({
  declarations: [
    CompanyItemPage,
  ],
  imports: [
    IonicPageModule.forChild(CompanyItemPage),
  ],
})
export class CompanyListPageModule {}
