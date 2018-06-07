import { Component} from '@angular/core';
import { NavController} from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import { NativeStorage } from '@ionic-native/native-storage';

@Component({
  selector: 'page-done',
  templateUrl: 'done.html',
})
export class DonePage {

  // Facebook APIs
  user: any;
  userReady: boolean = false;
  page_data: any;
  pageReady: boolean = false;
  comment_data: any;

  todoposts = [];
  todoid = [];
  inprogressposts = [];
  inprogresscomments = [];

  constructor(
    public navCtrl: NavController,
    public fb: Facebook,
    public nativeStorage: NativeStorage
  ) { }

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
      let comment = ["user_posts",];
      this.getPageData(params);
      this.getCommentData(comment, params);
      this.userReady = true;
    }, (error) => {
      console.log(error);
    });
  }

  getPageData(params){
    // Feed
    this.fb.api("me/feed", params)
    .then((val) => {
      this.page_data = val.data;
      for( let i=0; i < this.page_data.length; i++){
        if(this.page_data[i].message.substring(0,5) === '#ToDo'){
          this.todoposts.push(this.page_data[i]);
          this.todoid.push(this.page_data[i].id);
        }
      }
      this.pageReady = true;
    }).catch((err) => {

    })
  }

  getCommentData(comment, params){

    this.fb.api("me/feed", params)
    .then((val) => {
      this.page_data = val.data;
      for( let h=0; h < this.page_data.length; h++){
        if(this.page_data[h].message.substring(0,5) === '#ToDo'){
          // Comments
          this.fb.api("me/feed?fields=comments", comment)
          .then((val) => {
            this.comment_data = val;
            // console.log(JSON.stringify({val}));
            this.comment_data = val.data;
              if(this.todoid[h] == this.comment_data[h].id){
                  console.log(JSON.stringify(this.todoid[h]));
                  console.log(JSON.stringify(this.comment_data[h].id));
                  for (let i = 0 ; i < this.comment_data[h].comments.data.length ; i++) {
                    console.log(JSON.stringify(this.comment_data[h].comments.data[i].message));
                    if(this.comment_data[h].comments.data[i].message == '#end'){
                      if (this.comment_data[h].id == this.todoid[h]) {
                        this.inprogressposts.push(this.todoposts[h].message);
                      }
                    }
                      // this.inprogressposts.push(this.comment_data[h].comments.data[i].message);
                  }
              }
            
            this.pageReady = true;
          }).catch((err) => {
            console.log("error : "+JSON.stringify({err}));
          })
        }
      }
      this.pageReady = true;
    }).catch((err) => {

    })
    
  }


}
