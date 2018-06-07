import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InprogressPage } from './inprogress';

@NgModule({
  declarations: [
    InprogressPage,
  ],
  imports: [
    IonicPageModule.forChild(InprogressPage),
  ],
  exports: [
    InprogressPage
  ]
})
export class InprogressPageModule {}
