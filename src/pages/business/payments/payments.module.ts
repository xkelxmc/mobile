import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {BusinessPaymentsPage} from "./payments";

@NgModule({
  declarations: [
    BusinessPaymentsPage,
  ],
  imports: [
    IonicPageModule.forChild(BusinessPaymentsPage),
  ],
})
export class BusinessPaymentsPageModule {}
