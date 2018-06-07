import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import { NativeStorage } from '@ionic-native/native-storage';

@Component({
  selector: 'page-user-post',
  templateUrl: 'user-post.html'
})

export class UserPostPage {

  user: any;
  userReady: boolean = false;

  page_data:any;
  pageReady: boolean = false;

  constructor(
    public navCtrl: NavController,
    public fb: Facebook,
    public nativeStorage: NativeStorage
  ) {}

  ionViewCanEnter(){
    this.nativeStorage.getItem('user')
    .then((data) => {
      this.user = {
        id: data.id,
        name: data.name,
        gender: data.gender,
        picture: data.picture
      };

      let params = new Array<string>();
    
      this.getPageData(params,this.user.id);

      this.userReady = true;
    }, (error) => {
      console.log(error);
    });

    
  }



  getPageData(params,page_id){
    //let nav = this.navCtrl;
    //Getting name and gender properties
    this.fb.api("me/feed", params)
    .then((val) => {
      this.page_data = val.data;
      //console.log(JSON.stringify(this.page_data));
      this.pageReady = true;
    }).catch((err) => {
      //console.log(JSON.stringify({err}));
    })
  }
  
}
