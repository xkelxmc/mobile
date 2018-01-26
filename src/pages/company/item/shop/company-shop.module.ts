import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {CompanyShopPage} from "./company-shop";

@NgModule({
  declarations: [
    CompanyShopPage,
  ],
  imports: [
    IonicPageModule.forChild(CompanyShopPage),
  ],
})
export class CompanyShopPageModule {}
