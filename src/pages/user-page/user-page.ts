import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import { NativeStorage } from '@ionic-native/native-storage';

@Component({
  selector: 'page-user-page',
  templateUrl: 'user-page.html'
})

export class UserPagePage {

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
    
      this.getPageData(params,'teenaitravel');

      this.userReady = true;
    }, (error) => {
      console.log(error);
    });

    
  }



  getPageData(params,page_id){
    //let nav = this.navCtrl;
    //Getting name and gender properties
    this.fb.api(page_id+"/posts", ["pages_show_list"])
    .then((val) => {
      this.page_data = val;
      //console.log(JSON.stringify({val}));
      this.pageReady = true;
    }).catch((err) => {
      console.log("error : "+JSON.stringify({err}));
    })
  }
  
}
