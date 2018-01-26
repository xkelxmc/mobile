import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {PromocodesPage} from "./promocodes";

@NgModule({
  declarations: [
    PromocodesPage,
  ],
  imports: [
    IonicPageModule.forChild(PromocodesPage),
  ],
})
export class PromocodesPageModule {}
