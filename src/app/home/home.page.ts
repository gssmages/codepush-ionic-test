import { Component } from '@angular/core';
import { Sim } from '@ionic-native/sim/ngx';
import { Device } from '@ionic-native/device/ngx';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public simInfo: any;
  public cards: any;

  isOn = false;
  scannedData: {};
  constructor(
    private sim: Sim,
    private device: Device,
    private qrScanner: QRScanner
  ) {}
  async getSimData() {
    
    var deviceID = this.device.uuid;
    console.log(deviceID);
    alert(deviceID)
    this.sim.getSimInfo().then(
      (info) => {this.simInfo= JSON.stringify(info)},
      (err) => console.log('Unable to get sim info: ', err)
    );

    this.sim.hasReadPermission().then(
      (info) => console.log('Has permission:', info)
    );
    this.sim.requestReadPermission().then(
      () => console.log('Permission granted'),
      () => console.log('Permission denied')
    );
    /* try {
      let simPermission = await this.sim.requestReadPermission();
      if (simPermission == "OK") {
        let simData = await this.sim.getSimInfo();
        this.simInfo = JSON.stringify(simData);
        this.cards = simData.cards;
        console.log(simData);
      }
    } catch (error) {
      console.log(error);
    }*/

  }
  async getQRScan() {
    this.qrScanner.prepare()
    .then((status: QRScannerStatus) => {
      if (status.authorized) {

        this.isOn = true;
        
        // start scanning
        const scanSub = this.qrScanner.scan().subscribe((text: string) => {
          console.log('Scanned something', text);
          alert(text)
          this.isOn = false;
          this.qrScanner.hide();
          scanSub.unsubscribe();
        });
        this.qrScanner.show();


      } else if (status.denied) {
        // camera permission was permanently denied
        // you must use QRScanner.openSettings() method to guide the user to the settings page
        // then they can grant the permission from there
        this.qrScanner.openSettings();
      } else {
        // permission was denied, but not permanently. You can ask for permission again at a later time.
      }
    })
    .catch((e: any) => console.log('Error is', e));
   
  } 
  stopscanning()  
  {
    
    this.qrScanner.hide();
    this.qrScanner.destroy();
    console.log('Scanned stopped');
  }
  
}
