import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {CertificatesPage} from "./certificates";

@NgModule({
  declarations: [
    CertificatesPage,
  ],
  imports: [
    IonicPageModule.forChild(CertificatesPage),
  ],
})
export class CertificatesPageModule {}
