import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {CompanyItemMap} from "./company-item-map";

@NgModule({
  declarations: [
    CompanyItemMap,
  ],
  imports: [
    IonicPageModule.forChild(CompanyItemMap),
  ],
})
export class CompanyItemMapModule {}
