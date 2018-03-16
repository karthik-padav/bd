import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';


// import { TabsPage } from '../../pages/tabs/tabs';
import { EditprofilePage } from '../../pages/editprofile/editprofile';
import { TabsPage } from '../../pages/tabs/tabs';
import { DataProvider } from '../../providers/data/data';
import { Toast } from '@ionic-native/toast';
import { LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  userData:any = {
    data:[]
  }
  loading:any;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public DataService:DataProvider,
              private toast: Toast,
              public loadingCtrl: LoadingController,
              public platform: Platform,
              private storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    // this.login();
    // this.loginForBrowser();
    this.storage.get('userData').then((val) => {
      if(val){
        this.navCtrl.setRoot(TabsPage);
      }
    })
  }


  login() {
    (<any>window).AccountKitPlugin.loginWithPhoneNumber({
      useAccessToken: true,
      defaultCountryCode: "IN",
      facebookNotificationsEnabled: true,
    }, (data) => {
      (<any>window).AccountKitPlugin.getAccount((info) => {
        console.log('phone' + info.phoneNumber);
        this.presentLoadingDefault();
        this.DataService.getUser({ phoneNumber: info.phoneNumber }).subscribe(data => {
          this.userData = data;
          this.loading.dismiss();
          console.log(this.userData);
          if(this.userData.status == "user_found"){
            console.log('tab');
            this.storage.set('userData', this.userData.data[0]);
            this.navCtrl.setRoot(TabsPage);
          } else if(this.userData.status == "user_not_found"){
            console.log('edit profile');
            this.navCtrl.setRoot(EditprofilePage, { phoneNumber: info.phoneNumber });
          }
        },
          err => {
            console.log(err);
            this.loading.dismiss();
            this.toastMsg(err);
          });
      })
    }, (err) => {
      if (err == 'User cancelled') {
        this.platform.exitApp();
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

  // Loader
  presentLoadingDefault() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  
    this.loading.present();
  }

  logout(){
    (<any>window).AccountKitPlugin.logout((info) =>{
      console.log('logout');
    }, (err) => {
      alert(err);
    })
  }






  // Browser

  loginForBrowser(){
    this.DataService.getUser({phoneNumber: '9901373621'}).subscribe(data => {
      this.userData = data;
      console.log(this.userData);
      if(this.userData.status == "user_found"){
        console.log('tab');
        this.storage.set('userData', this.userData.data[0]);
        this.navCtrl.setRoot(TabsPage);
      } else if(this.userData.status == "user_not_found"){
        console.log('edit profile');
        this.navCtrl.setRoot(EditprofilePage, {phoneNumber: '9901373621'});
      }
    },
    err => {
      console.log(err);
      this.toastMsg(err);
    });
  }

}
