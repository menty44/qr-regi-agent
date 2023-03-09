import { Component } from '@angular/core';

import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';

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
  code: any;
  user: any;
  firstname: any;
  lastname: any;
  email: any;
  phone: any;

  constructor(private barcodeScanner: BarcodeScanner) { }

  public mail: string = "";

  ngOnInit() {
    let user = localStorage.getItem('user');
    let parsed = (user !== null) ? JSON.parse(user) : "";
    this.user = parsed.users;
    console.log(parsed.users.email);
    this.mail = parsed.users.email;
    this.firstname = parsed.users.first_name;
    this.lastname = parsed.users.last_name;
    this.phone = parsed.users.phone;
    // this.firstname = parsed.users.first_name;
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

  verify() {
    alert(this.mail + ' ' + this.code);
  }

}
