import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

/*
  Generated class for the DescuentosProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DescuentosProvider {

  constructor(public http: Http) {
    console.log('Hello DescuentosProvider Provider');
  }

  getDescuentos(){
    return this.http.get('https://randomuser.me/api/?results=25')
    .map(res => res.json()).toPromise();
    //return this.http.get('http://pilotoprueba.esy.es/promotores/getMyPromotores.php')
  }

}
