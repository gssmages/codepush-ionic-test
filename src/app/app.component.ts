import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { CodePush, InstallMode, SyncStatus } from '@ionic-native/code-push/ngx';
import { Sim } from '@ionic-native/sim/ngx';
import { Device } from '@ionic-native/device/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private codePush: CodePush,
    private sim: Sim,
    private device: Device
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
     optionalInstallButtonLabel:"Update",
      descriptionPrefix: "\n\nUpdate info:\n"   
     },
     installMode: InstallMode.IMMEDIATE
  },(progress)=>{

  }).subscribe((status)=>{
    // if(status==SyncStatus.CHECKING_FOR_UPDATE)
    // alert("Checking for Update");
    if(status==SyncStatus.DOWNLOADING_PACKAGE)
    alert("Downloading Package");
    if(status==SyncStatus.IN_PROGRESS)
    alert("In Progress");
    if(status==SyncStatus.INSTALLING_UPDATE)
    alert("Installing update");
    // if(status==SyncStatus.UP_TO_DATE)
    // alert("Update Up-to-date");
    if(status==SyncStatus.UPDATE_INSTALLED)
    alert("Update Installed");
    if(status==SyncStatus.ERROR)
    alert("Error While Updating");
  }
    // (data) => {
    //  console.log('CODE PUSH SUCCESSFUL: ' + data);
     
    // },
    // (err) => {
    //  console.log('CODE PUSH ERROR: ' + err);
     
    // }
  );
 }
}
