import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { DataProvider } from '../../providers/data/data';
import { LoadingController } from 'ionic-angular';
import { Toast } from '@ionic-native/toast';

/**
 * Generated class for the RequestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-request',
  templateUrl: 'request.html',
})
export class RequestPage {
  userData: any = {};
  victimData: any = {};
  res:any = {};
  loading:any;
  constructor(public navCtrl: NavController,
              private storage: Storage,
              public DataService:DataProvider,
              public loadingCtrl: LoadingController,
              private toast: Toast,
              public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RequestPage');
    this.storage.get('userData').then((val) => {
      this.userData = val;
      console.log(val);
    });
  }

  // Send victim request
  request(){
    this.victimData.user_id = this.userData.id;
    console.log(this.victimData);
    this.DataService.sendRequest(this.victimData).subscribe(data => {
      console.log(data);
      this.res = data;
      if(this.res.status == "Success"){
        this.loading.dismiss();
        this.navCtrl.pop();
      } else {
        this.toastMsg(this.res.status);
      }
    })
  }


  // Toast message
  toastMsg(msg){
    this.toast.show(msg, '5000', 'bottom').subscribe(
      toast => {
        console.log(toast);
      }
    );
  }

}
