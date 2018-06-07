import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import { NativeStorage } from '@ionic-native/native-storage';

@Component({
  selector: 'page-user-group',
  templateUrl: 'user-group.html'
})

export class UserGroupPage {

  user: any;
  userReady: boolean = false;

  group_data:any;
  groupReady: boolean = false;

  constructor(
    public navCtrl: NavController,
    public fb: Facebook,
    public nativeStorage: NativeStorage
  ) {}

  ionViewCanEnter(){
    this.nativeStorage.getItem('user')
    .then((data) => {
      this.user = {
        name: data.name,
        gender: data.gender,
        picture: data.picture
      };
      let params = new Array<string>();
    
      this.getGroupData(params,"537913249875630");
      this.userReady = true; 
    }, (error) => {
      console.log(error);
    });

    
  }



  getGroupData(params,group_id){
    //let nav = this.navCtrl;
    //Getting name and gender properties
    this.fb.api(group_id+"/posts", params)
    .then((val) => {
      this.group_data = val;
      //console.log(JSON.stringify({val}));
      this.groupReady = true;
    }).catch((err) => {
      console.log("error : "+JSON.stringify({err}));
    })
  }
  
}
