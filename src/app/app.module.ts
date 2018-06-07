import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { Facebook } from '@ionic-native/facebook';
import { NativeStorage } from '@ionic-native/native-storage';
import { SplashScreen} from "@ionic-native/splash-screen";
import { StatusBar} from "@ionic-native/status-bar";
import { LoginPage } from '../pages/login/login';
import { UserPage } from '../pages/user/user';
import { UserPagePage } from '../pages/user-page/user-page';
import { UserGroupPage } from '../pages/user-group/user-group';
import { UserPostPage } from '../pages/user-post/user-post';
import { BrowserModule } from '@angular/platform-browser';

import { PrimaryTabsPage } from '../pages/primary-tabs/primary-tabs';
import { TodoPage } from '../pages/todo/todo';
import { InprogressPage } from '../pages/inprogress/inprogress';
import { DonePage } from '../pages/done/done';
import { DashboardPage } from '../pages/dashboard/dashboard';

import { ChartModule } from 'angular2-highcharts';
import * as highcharts from 'Highcharts';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    UserPage,
    UserPagePage,
    UserGroupPage,
    UserPostPage,
    PrimaryTabsPage,
    TodoPage,
    InprogressPage,
    DonePage,
    DashboardPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    ChartModule.forRoot(highcharts)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    UserPage,
    UserPagePage,
    UserGroupPage,
    UserPostPage,
    PrimaryTabsPage,
    TodoPage,
    InprogressPage,
    DonePage,
    DashboardPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Facebook,
    NativeStorage
  ]
})
export class AppModule {}
