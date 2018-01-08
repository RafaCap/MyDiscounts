import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController, LoadingController } from 'ionic-angular';
import { Auth, User, UserDetails, IDetailedError } from '@ionic/cloud-angular';
import { HomePage } from '../home/home';
/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

  
@Component({
   selector: 'validation',
   template: `
   <ion-item [style.background-color]="getValidation()"> 
   </ion-item> 
  `
})

export class Validation{
  constructor(){
  }
  getValidation(){
    return "yellow";
  }
}


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {

  showLogin:boolean = true;
  email:string = '';
  password:string = '';
  name:string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public auth:Auth, public User: User, public AlertController: AlertController, public LoadingController: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('Hello LoginPage');
  }

  doLogin() {
      
      if(this.showLogin){
        console.log('Entrando en el proceso de Login');
        //Validation.getValidation();
        //his.getValidation();
        if((this.email ==='')||(this.password ==='')){
            let alert = this.AlertController.create({
            title:'Error', 
            subTitle:'El email y/o la contraseña están vacías',
            buttons:['OK']
          });
          alert.present();
          return;
        }
        let loader = this.LoadingController.create({
          content: "Logging in..."
         });
        loader.present();
        this.auth.login('basic', {'email':this.email, 'password':this.password}).then(() => {
          loader.dismissAll();
          this.navCtrl.setRoot(HomePage);
        },(err) => {
          loader.dismissAll();
          console.log(err.message);

          let errors = '';
          if(err.message === 'UNPROCESSABLE ENTITY') errors += 'Email isn\'t valid.<br/>';
          if(err.message === 'UNAUTHORIZED') errors += 'Password is required.<br/>';

          let alert = this.AlertController.create({
            title:'Login Error', 
            subTitle:errors,
            buttons:['OK']
          });
          alert.present();
        });
      }
      else{
        this.showLogin=true;
      }
  }

   doRegister() {
      console.log('Hello doRegister');
      if(!this.showLogin){
          if(this.name===''){
              let alert = this.AlertController.create({
              title:'Error', 
              subTitle:'El nombre está vacío',
              buttons:['OK']
            });
            alert.present();
            return;
          }
          if(this.password===''){
              let alert = this.AlertController.create({
              title:'Error', 
              subTitle:'La contraseña está vacía',
              buttons:['OK']
            });
            alert.present();
            return;
          }
          if(this.email===''){
            let alert = this.AlertController.create({
              title:'Error', 
              subTitle:'El email está vacío',
              buttons:['OK']
            });
            alert.present();
            return;
          }

        let details: UserDetails = {'email':this.email, 'password':this.password, 'name':this.name};
        console.log(details);  

        let loader = this.LoadingController.create({
        content: "Registrando nuevo usuario..."
      });
      loader.present();

      this.auth.signup(details).then(() => {
        console.log('ok signup');
        this.auth.login('basic', {'email':details.email, 'password':details.password}).then(() => {
          loader.dismissAll();
          this.navCtrl.setRoot(HomePage);
        });

      }, (err:IDetailedError<string[]>) => {
        loader.dismissAll();
        let errors = '';
        for(let e of err.details) {
          console.log(e);
          if(e === 'required_email') errors += 'Email is required.<br/>';
          if(e === 'required_password') errors += 'Password is required.<br/>';
          if(e === 'conflict_email') errors += 'A user with this email already exists.<br/>';
          //don't need to worry about conflict_username
          if(e === 'invalid_email') errors += 'Your email address isn\'t valid.';
        }
        let alert = this.AlertController.create({
          title:'Register Error', 
          subTitle:errors,
          buttons:['OK']
        });
        alert.present();
      });


      }
      else {
      this.showLogin = false;
    }
  }
}
