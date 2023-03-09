import { Component, OnInit } from '@angular/core';
// var axios = require('axios');
import axios from 'axios';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {
  email!: string;
  password!: string;

  constructor(private router: Router) { }

  ngOnInit() {}

  login() {
    let self = this;
    var data = JSON.stringify({
      email: this.email,
      password: this.password
    });

    var config = {
      method: 'post',
    maxBodyLength: Infinity,
      url: 'https://backend.qr-regi.com/api/v1/auth/users/login',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };

    axios(config)
    .then(function (response: { data: any; }) {
      console.log(JSON.stringify(response.data.status));
      if (response.data.status == 'success') {
        alert('Login Successful');
        localStorage.setItem('user', JSON.stringify(response.data.data));
        self.router.navigateByUrl('/home');
      }else{
        alert("Wrong Credentials")
      }
    })
    .catch(function (error: any) {
      console.log(error);
    });
  }

}
