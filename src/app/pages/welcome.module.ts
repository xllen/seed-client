import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WelcomeRoutingModule } from './welcome-routing.module';

import { Business1Component } from './business1/business1.component';
import { Business2Component } from './business2/business2.component';
import { ShareModule } from '../share/share.module';

@NgModule({
  imports: [WelcomeRoutingModule, CommonModule, ShareModule],
  declarations: [Business1Component, Business2Component]
})
export class WelcomeModule { }
