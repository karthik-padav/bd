import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ImagePicker } from '@ionic-native/image-picker';
import { ActionSheetController } from 'ionic-angular';
import { Device } from '@ionic-native/device';
import { Toast } from '@ionic-native/toast';

import { DataProvider } from '../../providers/data/data';
import { TabsPage } from '../../pages/tabs/tabs';
import { LoginPage } from '../login/login';
import { LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the EditprofilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editprofile',
  templateUrl: 'editprofile.html',
})
export class EditprofilePage {
  userData:any={};
  loading:any;

  res:any = {}
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public DataService:DataProvider,
              private imagePicker: ImagePicker,
              private device: Device,
              public loadingCtrl: LoadingController,
              private toast: Toast,
              private storage: Storage,
              public actionSheetCtrl: ActionSheetController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditprofilePage');
    this.userData.user_dp = 'https://png.icons8.com/color/260/person-male.png';
    this.userData.phone_number = this.navParams.get('phoneNumber');
    this.userData.deviceModel = this.device.model;
    this.userData.devicePlatform = this.device.platform;
    this.userData.deviceVersion = this.device.version;
  }


  register() {
    console.log(this.userData);
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let emailIsValid = re.test(String(this.userData.email).toLowerCase());
    if(emailIsValid){
      this.presentLoadingDefault();
      // Api call
      this.DataService.register(this.userData).subscribe(data => {
        console.log(data);
        this.res = data;
        if(this.res.status == "Success"){
          this.loading.dismiss();
          this.storage.set('userData', this.res.userData);
          this.navCtrl.setRoot(TabsPage);
        } else {
          console.log('register');
          this.toastMsg(this.res.status);
        }
      },
        err => {
          this.loading.dismiss();
          console.log(err);
          this.toastMsg(err);
        });
    } else {
      console.log('invalid email');
      this.toastMsg('invalid email');
    }
  }


  // Loader
  presentLoadingDefault() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }

// Only for browser
  registerOnlyForBrowser() {
      this.DataService.register(this.userData).subscribe(data => {
        this.res = data;
        console.log(this.res);
        if(this.res.status == "Success"){
          this.storage.set('userData', this.res.userData);
          this.navCtrl.setRoot(TabsPage);
        } else {
          console.log('register');
        }
      },
        err => {
          console.log(err);
          this.toastMsg(err);
        });
  }


  logout(){
    (<any>window).AccountKitPlugin.logout((info) =>{
      console.log('logout');
      this.navCtrl.setRoot(LoginPage);
    }, (err) => {
      alert(err);
    })
  }

  userDpMenu() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Set a Profile Photo',
      buttons: [
        {
          text: 'New Profile Photo',
          role: 'destructive',
          handler: () => {
            console.log('Get picture');
            this.getPictures();
          }
        },{
          text: 'Remove Profile Photo',
          handler: () => {
            console.log('Archive clicked');
            this.userData.user_dp = 'https://png.icons8.com/color/260/person-male.png';
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  getPictures(){
    let options = {
      title: 'Select Picture',
      message: 'Select Least 1 picture',
      maximumImagesCount : 1,
      outType: 1
    }
    this.imagePicker.getPictures(options).then((results) => {
      console.log(results);
      for (var i = 0; i < results.length; i++) {
          console.log('Image URI: ' + results[i]);
          this.userData.user_dp = results[i];
      }
    }, (err) => {
      this.userData.user_dp = 'https://png.icons8.com/color/260/person-male.png';
    });
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
