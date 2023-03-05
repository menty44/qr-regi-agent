import { Component } from '@angular/core';

import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { AlertController } from '@ionic/angular';

// ES6 Modules or TypeScript
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  scannedData: any;
  encodedData!: '';
  encodeData: any;
  inputData: any;
  clickSub: any;

  constructor(public alertController: AlertController, private localNotifications: LocalNotifications, private barcodeScanner: BarcodeScanner) { }

  async presentAlert(data: any) {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: data,
      buttons: ['OK']
    });
    await alert.present();
  }

  unsub() {
    this.clickSub.unsubscribe();
  }

  simpleNotif(data: any) {
    // this.clickSub = this.localNotifications.on('click').subscribe(data => {
      console.log(data);
      this.presentAlert('Your notifiations contains a secret = ' + data);
      this.unsub();
    // });
    this.localNotifications.schedule({
      id: 1,
      text: 'Single Local Notification',
      data: data
    });

  }

  scanBarcode() {
    const options: BarcodeScannerOptions = {
      preferFrontCamera: false,
      showFlipCameraButton: true,
      showTorchButton: true,
      torchOn: false,
      prompt: 'Place a barcode inside the scan area',
      resultDisplayDuration: 500,
      formats: 'EAN_13,EAN_8,QR_CODE,PDF_417 ',
      orientation: 'portrait',
    };

    this.barcodeScanner.scan(options).then(barcodeData => {
      console.log('Barcode data', barcodeData);
      this.scannedData = barcodeData;

      alert('Success ' + JSON.stringify(barcodeData.text));
      this.simpleNotif(JSON.stringify(barcodeData.text))
    }).catch(err => {
      console.log('Error', err);
    });
  }

  createBarcode() {
    this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE, this.inputData).then((encodedData) => {
      console.log(encodedData);
      this.encodedData = encodedData;
    }, (err) => {
      console.log('Error occured : ' + err);
    });
  }

}
