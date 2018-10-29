import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireAuthModule } from "angularfire2/auth";

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { PrincipalPage } from '../pages/principal/principal';

const config = {
  apiKey: "AIzaSyD42s6BICp-AdouOZdC0Jf0MYlfSyofQY4",
    authDomain: "crud-76b73.firebaseapp.com",
    databaseURL: "https://crud-76b73.firebaseio.com",
    projectId: "crud-76b73",
    storageBucket: "crud-76b73.appspot.com",
    messagingSenderId: "881021520694"
};
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PrincipalPage,
    LoginPage,
    RegisterPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PrincipalPage,
    LoginPage,
    RegisterPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AngularFireAuthModule
  ]
})
export class AppModule {}
