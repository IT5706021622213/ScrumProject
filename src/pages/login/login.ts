import { Component } from '@angular/core';
import { Facebook } from '@ionic-native/facebook';
import { NativeStorage } from '@ionic-native/native-storage';
import { NavController } from 'ionic-angular';
import { UserPage } from '../user/user';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  FB_APP_ID: number = 2164164627144694;

  constructor(
    public navCtrl: NavController,
    public fb: Facebook,
    public nativeStorage: NativeStorage
    ) {
    this.fb.browserInit(this.FB_APP_ID, "v2.8");
  }

  doFbLogin(){
    let permissions = new Array<string>();
    

    //the permissions your facebook app needs from the user
    permissions = ["public_profile",
    "email",
    "user_events",
    "user_managed_groups",
    "pages_show_list",
    "user_posts"/*,
    "publish_pages",
    "user_photos",
    "user_videos",
    "user_friends",
    "user_tagged_places",
    "user_posts",
    "email",
    "publish_actions",
    "user_managed_groups",
    "manage_pages",
    "pages_show_list",
    "public_profile",
    "basic_info"*/
  ];

    this.fb.login(permissions)
    .then((response) => {
      let userId = response.authResponse.userID;
      let params = new Array<string>();

      let nav = this.navCtrl;
    //Getting name and gender properties
      this.fb.api("/me?fields=name,gender,email", params)
        .then((user) => {
        console.log(JSON.stringify({user}));
        console.log(JSON.stringify({userId}));
        user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
        //now we have the users info, let's save it in the NativeStorage
        this.nativeStorage.setItem('user',
        { 
          id: userId,
          name: user.name,
          gender: user.gender,
          picture: user.picture
        })
        .then(() => {
          nav.push(UserPage);
        },(error) => {
          console.log(error);
        })
      })

      
    }, (error) => {
      console.log(error);
    });
  }



  


}
