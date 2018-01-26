import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {ShoppingOrderPage} from "./shopping-order";

@NgModule({
  declarations: [
    ShoppingOrderPage,
  ],
  imports: [
    IonicPageModule.forChild(ShoppingOrderPage),

  ],
})
export class ShoppingOrderPageModule {}
