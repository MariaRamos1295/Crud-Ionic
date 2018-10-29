import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import { AngularFireAuth } from "angularfire2/auth";

import { PrincipalPage } from '../principal/principal';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  username : string;
  noteID: any;
  noteCollection:AngularFirestoreCollection<any>;
  noteDoc: AngularFirestoreDocument<any>;
  notes: Observable<any>;
  

  constructor( private afAuth: AngularFireAuth, private toast: ToastController,
    public alertCtrl: AlertController,
    public db:AngularFirestore,
    public navCtrl: NavController,
    public navParams: NavParams
    ) {
      this.noteCollection=this.db.collection('note');
      this.notes=this.noteCollection.valueChanges();
      this.username=this.navParams.get('name');
      console.log(this.username);
  }

  addNote(){
    let alert=this.alertCtrl.create({
      title: 'Agregar Nombre',
      inputs:[{
        name:'note',
        placeholder:'ingrese el nombre'
      }],
      buttons:[
        {
          text:'Cancelar',
          role:'calcel'
        },
        {
          text:'Agregar',
          handler:data=>{
            this.noteCollection.add(data).then(result=>{
              console.log(result.id);
              this.noteID=result.id;
              this.db.doc(`note/${result.id}`).update({id: this.noteID});
            }).catch(err=>{
              console.log(err);
            })
          }
        }
      ]
    });
    alert.present();
  }

  edit(note){
    let alert=this.alertCtrl.create({
      title: 'Editar Nombre',
      inputs:[{
        name:'note',
        value:note.note,
        placeholder:'ingrese el nombre'
        
      }],
      buttons:[
        {
          text:'Cancelar',
          role:'calcel'
        },
        {
          text:'Actualizar',
          handler:data=>{
           
            this.db.doc(`note/${note.id}`).update(data);
           
            
          }
        }
      ]
    });
    alert.present();
  }

  delete(note){
    let alert=this.alertCtrl.create({
      title: 'Eliminar Nombre',
      message:'Esta seguro de Eliminar el Nombre',
      
      buttons:[
        {
          text:'Cancelar',
          role:'calcel'
        },
        {
          text:'Eliminar',
          handler:data=>{
           
            this.db.doc(`note/${note.id}`).delete()
           
            
          }
        }
      ]
    });
    alert.present();
  
  }

  LogOut(){
    this.navCtrl.setRoot(PrincipalPage)
  }

  ionViewWillLoad(){
    this.afAuth.authState.subscribe(data=> {
      if(data.email && data.uid){
      this.toast.create({
        message:`Bienvenido APP_NAME, ${data.email}`,
        duration: 3000
      }).present();
    }
    else{
      this.toast.create({
        message:`No se Encontro Autenticacion`,
        duration: 3000
      }).present();
    }
    });
    
    }
}
