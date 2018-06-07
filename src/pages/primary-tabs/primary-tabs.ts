import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import { NativeStorage } from '@ionic-native/native-storage';

@IonicPage()
@Component({
  selector: 'page-primary-tabs',
  templateUrl: 'primary-tabs.html',
})
export class PrimaryTabsPage {
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

  paramitor = [];

  ShowTodo: boolean = true;
  ShowInprogress: boolean = false;
  ShowDone: boolean = false;
  
  newdate = new Date;
  shownew = [];
  // Searchber
  serchQuery: string = '';

  public isSearchberOpened = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public fb: Facebook,
    public nativeStorage: NativeStorage,
    public loadingCtrl: LoadingController
  ) {
    this.initializeItems();
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    loader.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PrimaryTabsPage');
  }

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
          let newtodo = {
            status: 'ยังไม่ได้ทำ',
            id: this.todoposts[i].id,
            sage: this.todoposts[i].message,
            time: this.todoposts[i].created_time,
            timestart: '',
            timeend: '',
            deadline: '',
            name: '',
            duty: '',
            progressdate: '',
            donedate: '',
            datenew: '',
            showcomments: '',
          }
          this.paramitor.push(newtodo);
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
                  // console.log(JSON.stringify(this.todoid[h]));
                  // console.log(JSON.stringify(this.comment_data[h].id));
                  for (let i = 0 ; i < this.comment_data[h].comments.data.length ; i++) {
                    // console.log(JSON.stringify(this.comment_data[h].comments.data[i].message));
                    if(this.comment_data[h].comments.data[i].message == '#start'){
                      if (this.comment_data[h].id == this.todoid[h]) {
                        this.paramitor[h].status = 'กำลังทำ'
                        this.paramitor[h].timestart = this.comment_data[h].comments.data[i].created_time.substring(0,10)
                      }
                    }
                    if(this.comment_data[h].comments.data[i].message.substring(0,5) == '#date'){
                      if (this.comment_data[h].id == this.todoid[h]) {
                        this.paramitor[h].deadline = 'Deadline : ' + this.comment_data[h].comments.data[i].message.substring(6);
                        // console.log("Name : " + JSON.stringify(this.comment_data[h].comments.data[i].message));
                        if (this.paramitor[h].deadline.substring(19,21) === '01') {
                          this.paramitor[h].progressdate = 1;
                        }
                        if (this.paramitor[h].deadline.substring(19,21) === '02') {
                          this.paramitor[h].progressdate = 2;
                        }
                        if (this.paramitor[h].deadline.substring(19,21) === '03') {
                          this.paramitor[h].progressdate = 3;
                        }
                        if (this.paramitor[h].deadline.substring(19,21) === '04') {
                          this.paramitor[h].progressdate = 4;
                        }
                        if (this.paramitor[h].deadline.substring(19,21) === '05') {
                          this.paramitor[h].progressdate = 5;
                        }
                        if (this.paramitor[h].deadline.substring(19,21) === '06') {
                          this.paramitor[h].progressdate = 6;
                        }
                        if (this.paramitor[h].deadline.substring(19,21) === '07') {
                          this.paramitor[h].progressdate = 7;
                        }
                        if (this.paramitor[h].deadline.substring(19,21) === '08') {
                          this.paramitor[h].progressdate = 8;
                        }
                        if (this.paramitor[h].deadline.substring(19,21) === '09') {
                          this.paramitor[h].progressdate = 9;
                        }
                        if (this.paramitor[h].deadline.substring(19,21) === '10') {
                          this.paramitor[h].progressdate = 10;
                        }
                        if (this.paramitor[h].deadline.substring(19,21) === '11') {
                          this.paramitor[h].progressdate = 11;
                        }
                        if (this.paramitor[h].deadline.substring(19,21) === '12') {
                          this.paramitor[h].progressdate = 12;
                        }
                        if (this.paramitor[h].deadline.substring(19,21) === '13') {
                          this.paramitor[h].progressdate = 13;
                        }
                        if (this.paramitor[h].deadline.substring(19,21) === '14') {
                          this.paramitor[h].progressdate = 14;
                        }
                        if (this.paramitor[h].deadline.substring(19,21) === '15') {
                          this.paramitor[h].progressdate = 15;
                        }
                        if (this.paramitor[h].deadline.substring(19,21) === '16') {
                          this.paramitor[h].progressdate = 16;
                        }
                        if (this.paramitor[h].deadline.substring(19,21) === '17') {
                          this.paramitor[h].progressdate = 17;
                        }
                        if (this.paramitor[h].deadline.substring(19,21) === '18') {
                          this.paramitor[h].progressdate = 18;
                        }
                        if (this.paramitor[h].deadline.substring(19,21) === '19') {
                          this.paramitor[h].progressdate = 19;
                        }
                        if (this.paramitor[h].deadline.substring(19,21) === '20') {
                          this.paramitor[h].progressdate = 20;
                        }
                        if (this.paramitor[h].deadline.substring(19,21) === '21') {
                          this.paramitor[h].progressdate = 21;
                        }
                        if (this.paramitor[h].deadline.substring(19,21) === '22') {
                          this.paramitor[h].progressdate = 22;
                        }
                        if (this.paramitor[h].deadline.substring(19,21) === '23') {
                          this.paramitor[h].progressdate = 23;
                        }
                        if (this.paramitor[h].deadline.substring(19,21) === '24') {
                          this.paramitor[h].progressdate = 24;
                        }
                        if (this.paramitor[h].deadline.substring(19,21) === '25') {
                          this.paramitor[h].progressdate = 25;
                        }
                        if (this.paramitor[h].deadline.substring(19,21) === '26') {
                          this.paramitor[h].progressdate = 26;
                        }
                        if (this.paramitor[h].deadline.substring(19,21) === '27') {
                          this.paramitor[h].progressdate = 27;
                        }
                        if (this.paramitor[h].deadline.substring(19,21) === '28') {
                          this.paramitor[h].progressdate = 28;
                        }
                        if (this.paramitor[h].deadline.substring(19,21) === '29') {
                          this.paramitor[h].progressdate = 29;
                        }
                        if (this.paramitor[h].deadline.substring(19,21) === '30') {
                          this.paramitor[h].progressdate = 30;
                        }
                        if (this.paramitor[h].deadline.substring(19,21) === '31') {
                          this.paramitor[h].progressdate = 31;
                        }
                        this.paramitor[h].datenew = this.newdate.getDate();
                      }
                    }
                    if(this.comment_data[h].comments.data[i].message.substring(0,8) == '#comment'){
                      if (this.comment_data[h].id == this.todoid[h]) {
                        this.paramitor[h].showcomments = this.paramitor[h].showcomments + 'Comment : ' + this.comment_data[h].comments.data[i].message.substring(9) + ' ';
                      }
                    }
                    if(this.comment_data[h].comments.data[i].message.substring(0,5) == '#name'){
                      if (this.comment_data[h].id == this.todoid[h]) {
                        this.paramitor[h].name = this.paramitor[h].name + 'Name : ' + this.comment_data[h].comments.data[i].message.substring(6) + ' ';
                        // console.log("Name : " + JSON.stringify(this.comment_data[h].comments.data[i].message));
                      }
                    }
                    if(this.comment_data[h].comments.data[i].message.substring(0,5) == '#duty'){
                      if (this.comment_data[h].id == this.todoid[h]) {
                        this.paramitor[h].duty = this.paramitor[h].duty + 'Duty : ' + this.comment_data[h].comments.data[i].message.substring(6) + ' ';
                        // console.log("Name : " + JSON.stringify(this.comment_data[h].comments.data[i].message));
                      }
                    }
                    if(this.comment_data[h].comments.data[i].message == '#end'){
                      if (this.comment_data[h].id == this.todoid[h]) {
                        this.paramitor[h].status = 'ทำเสร็จแล้ว'
                        this.paramitor[h].timeend = this.comment_data[h].comments.data[i].created_time.substring(0,10)
                        if (this.paramitor[h].timeend.substring(8,10) === '01') {
                          this.paramitor[h].donedate = 1;
                        }
                        if (this.paramitor[h].timeend.substring(8,10) === '02') {
                          this.paramitor[h].donedate = 2;
                        }
                        if (this.paramitor[h].timeend.substring(8,10) === '03') {
                          this.paramitor[h].donedate = 3;
                        }
                        if (this.paramitor[h].timeend.substring(8,10) === '04') {
                          this.paramitor[h].donedate = 4;
                        }
                        if (this.paramitor[h].timeend.substring(8,10) === '05') {
                          this.paramitor[h].donedate = 5;
                        }
                        if (this.paramitor[h].timeend.substring(8,10) === '06') {
                          this.paramitor[h].donedate = 6;
                        }
                        if (this.paramitor[h].timeend.substring(8,10) === '07') {
                          this.paramitor[h].donedate = 7;
                        }
                        if (this.paramitor[h].timeend.substring(8,10) === '08') {
                          this.paramitor[h].donedate = 8;
                        }
                        if (this.paramitor[h].timeend.substring(8,10) === '09') {
                          this.paramitor[h].donedate = 9;
                        }
                        if (this.paramitor[h].timeend.substring(8,10) === '10') {
                          this.paramitor[h].donedate = 10;
                        }
                        if (this.paramitor[h].timeend.substring(8,10) === '11') {
                          this.paramitor[h].donedate = 11;
                        }
                        if (this.paramitor[h].timeend.substring(8,10) === '12') {
                          this.paramitor[h].donedate = 12;
                        }
                        if (this.paramitor[h].timeend.substring(8,10) === '13') {
                          this.paramitor[h].donedate = 13;
                        }
                        if (this.paramitor[h].timeend.substring(8,10) === '14') {
                          this.paramitor[h].donedate = 14;
                        }
                        if (this.paramitor[h].timeend.substring(8,10) === '15') {
                          this.paramitor[h].donedate = 15;
                        }
                        if (this.paramitor[h].timeend.substring(8,10) === '16') {
                          this.paramitor[h].donedate = 16;
                        }
                        if (this.paramitor[h].timeend.substring(8,10) === '17') {
                          this.paramitor[h].donedate = 17;
                        }
                        if (this.paramitor[h].timeend.substring(8,10) === '18') {
                          this.paramitor[h].donedate = 18;
                        }
                        if (this.paramitor[h].timeend.substring(8,10) === '19') {
                          this.paramitor[h].donedate = 19;
                        }
                        if (this.paramitor[h].timeend.substring(8,10) === '20') {
                          this.paramitor[h].donedate = 20;
                        }
                        if (this.paramitor[h].timeend.substring(8,10) === '21') {
                          this.paramitor[h].donedate = 21;
                        }
                        if (this.paramitor[h].timeend.substring(8,10) === '22') {
                          this.paramitor[h].donedate = 22;
                        }
                        if (this.paramitor[h].timeend.substring(8,10) === '23') {
                          this.paramitor[h].donedate = 23;
                        }
                        if (this.paramitor[h].timeend.substring(8,10) === '24') {
                          this.paramitor[h].donedate = 24;
                        }
                        if (this.paramitor[h].timeend.substring(8,10) === '25') {
                          this.paramitor[h].donedate = 25;
                        }
                        if (this.paramitor[h].timeend.substring(8,10) === '26') {
                          this.paramitor[h].donedate = 26;
                        }
                        if (this.paramitor[h].timeend.substring(8,10) === '27') {
                          this.paramitor[h].donedate = 27;
                        }
                        if (this.paramitor[h].timeend.substring(8,10) === '28') {
                          this.paramitor[h].donedate = 28;
                        }
                        if (this.paramitor[h].timeend.substring(8,10) === '29') {
                          this.paramitor[h].donedate = 29;
                        }
                        if (this.paramitor[h].timeend.substring(8,10) === '30') {
                          this.paramitor[h].donedate = 30;
                        }
                        if (this.paramitor[h].timeend.substring(8,10) === '31') {
                          this.paramitor[h].donedate = 31;
                        }
                        console.log("eiei : " + JSON.stringify(this.paramitor[h].timeend.substring(8,10)));
                      }
                    }

                    // console.log("NewDate : " + this.newdate.getDate());
                    
                      // this.inprogressposts.push(this.comment_data[h].comments.data[i].message);
                  }
                  // this.newparamitor.push(this.paramitor);
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
  
  Show(point){
    console.log(point);
    if(point == 0){
      this.ShowTodo = true;
      this.ShowInprogress = false;
      this.ShowDone = false;
    }
    else if(point == 1){
      this.ShowTodo = false;
      this.ShowInprogress = true;
      this.ShowDone = false;
    }
    else if(point == 2){
      this.ShowTodo = false;
      this.ShowInprogress = false;
      this.ShowDone = true;
    }
  }

  initializeItems() {
    this.paramitor;
  }

  onSearch(event: any) {
    this.initializeItems();
    let val = event.target.value;
    console.log(event.target.value)
    if (val && val.trim() != '') {
      this.paramitor = this.paramitor.filter((paramitors) => {
        return (paramitors.sage.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
    
  }

}
