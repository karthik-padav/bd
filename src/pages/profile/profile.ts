import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../../pages/login/login';
import { RequestPage } from '../../pages/request/request';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  userData:any={};
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    this.storage.get('userData').then((val) => {
      this.userData = val;
      console.log(val);
    });
  }


  logout(){
    (<any>window).AccountKitPlugin.logout((info) =>{
      console.log('logout');
      this.navCtrl.setRoot(LoginPage);
      this.storage.remove('userData');
    }, (err) => {
      alert(err);
    })
  }

  // Make request
  addRequest(){
    this.navCtrl.push(RequestPage);
  }

}
