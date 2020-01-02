import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Business1Component } from './business1/business1.component';
import { Business2Component } from './business2/business2.component';
import { DeactivateGuard } from '../core/services/router-strategy/deactivate-guard.service';

const routes: Routes = [
  { path: 'business1', component: Business1Component, canDeactivate: [DeactivateGuard] },
  { path: 'business2', component: Business2Component },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WelcomeRoutingModule { }
