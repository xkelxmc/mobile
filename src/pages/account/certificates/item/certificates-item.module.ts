import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {CertificatesItemPage} from "./certificates-item";

@NgModule({
  declarations: [
    CertificatesItemPage,
  ],
  imports: [
    IonicPageModule.forChild(CertificatesItemPage),
  ],
})
export class CertificatesItemPageModule {}
