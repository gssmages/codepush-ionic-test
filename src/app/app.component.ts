import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { CodePush, InstallMode, SyncStatus } from '@ionic-native/code-push/ngx';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private codePush: CodePush
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.checkCodePush(); //Use the plugin always after platform.ready()
    });
  }
  checkCodePush() {
    
    this.codePush.sync({
     updateDialog: {
      appendReleaseDescription: true,
      descriptionPrefix: "\n\nChange log:\n"   
     },
     installMode: InstallMode.IMMEDIATE
  }).subscribe(
    (data) => {
     console.log('CODE PUSH SUCCESSFUL: ' + data);
     
    },
    (err) => {
     console.log('CODE PUSH ERROR: ' + err);
     
    }
  );
 }
}
