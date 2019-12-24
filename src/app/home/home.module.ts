import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { HeaderComponent } from './header/header.component';
import { SiderComponent } from './sider/sider.component';
import { ContentComponent } from './content/content.component';
import { ShareModule } from '../share/share.module';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  imports: [
    ShareModule,
    HomeRoutingModule
  ],
  declarations: [
    HomeComponent,
    HeaderComponent,
    SiderComponent,
    ContentComponent
  ]
})

export class HomeModule { }
