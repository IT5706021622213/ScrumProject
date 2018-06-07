import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import { NativeStorage } from '@ionic-native/native-storage';
import { LoginPage } from '../login/login';
import { UserPagePage } from '../user-page/user-page';
import { UserGroupPage } from '../user-group/user-group';
import { UserPostPage } from '../user-post/user-post';

import { PrimaryTabsPage } from '../primary-tabs/primary-tabs';
import { DashboardPage } from '../dashboard/dashboard';

@Component({
  selector: 'page-user',
  templateUrl: 'user.html'
})

export class UserPage {

  user: any;
  userReady: boolean = false;


  constructor(
    public navCtrl: NavController,
    public fb: Facebook,
    public nativeStorage: NativeStorage
  ) {}

  ionViewCanEnter(){
    this.nativeStorage.getItem('user')
    .then((data) => {
      this.user = {
        id:data.id,
        name: data.name,
        gender: data.gender,
        picture: data.picture
      };
      this.userReady = true;
    }, (error) => {
      console.log(error);
    });

    let params = new Array<string>();
  }

  doFbLogout(){
    var nav = this.navCtrl;
    this.fb.logout()
    .then((response) => {
      //user logged out so we will remove him from the NativeStorage
      this.nativeStorage.remove('user');
      nav.push(LoginPage);
    }, (error) => {
      console.log(error);
    });
  }

  doFbPage(){
    this.navCtrl.push(UserPagePage);
  }

  doFbGroup(){
    this.navCtrl.push(UserGroupPage);
  }

  doFbPost(){
    this.navCtrl.push(UserPostPage);
  }

  doPrimaryTabs(){
    this.navCtrl.push(PrimaryTabsPage);
  }

  doDashboard(){
    this.navCtrl.push(DashboardPage);
  }

}
