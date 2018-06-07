import { Component} from '@angular/core';
import { NavController} from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import { NavParams } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';

@Component({
  selector: 'page-todo',
  templateUrl: 'todo.html',
})
export class TodoPage{
  todo: Array<any>;

  constructor(
    public navCtrl: NavController,
    public fb: Facebook,
    public nativeStorage: NativeStorage,
    private NavParams: NavParams
  ) { 
    this.todo = this.NavParams.get('item');
    console.log("Status : " + JSON.stringify(this.todo));
  }

}
