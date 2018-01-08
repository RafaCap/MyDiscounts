import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DescuentosProvider } from '../../providers/descuentos/descuentos';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  descuentos: any[] = [];


  constructor(public navCtrl: NavController, public descProvider: DescuentosProvider) {  
  }
  
  ionViewDidLoad(){
    this.descProvider.getDescuentos()
    .then(data => {
      this.descuentos = data.results;
    })
    .catch(error =>{
      console.error(error);
    })
  }

}
