import { Component } from '@angular/core';

import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';

// ES6 Modules or TypeScript
import Swal from 'sweetalert2';
// var axios = require('axios');
import axios from 'axios';
import { Router } from '@angular/router';
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
  village: any;

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
    this.village = parsed.users.village;
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
    const self = this;
    // alert(this.mail + ' ' + this.code);
    // var axios = require('axios');
    var data = JSON.stringify({
      agent: this.mail,
      code: this.code,
      village: this.village,
      event_id: "63e9528998456a2cf06ec685"
    });

    var config = {
      method: 'post',
    maxBodyLength: Infinity,
      url: 'https://backend.qr-regi.com/api/v1/dash/clients/scan',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data.data));
  if(response.data.data.clients.code === self.code){
    alert('Scan Success')
  }else{
    alert('Scan error')
  }
})
.catch(function (error) {
  console.log(error);
  alert('A Server Error occured')
});

  }

}
