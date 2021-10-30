import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { Person } from 'src/app/services/person';
import { RequesterService } from 'src/app/services/requester.service';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  password:string = '';
  people:Person[] = [];
  person = new Person();
  msgError:boolean = false;
  constructor(private appiService: RequesterService, private cookieService: CookieService) { }
  
  ngOnInit(): void {
    this.cookieService.delete('token');
    this.cookieService.delete('username');
  }
  login(){
    this.cookieService.set('token', this.email.value);
    this.cookieService.set('username', this.password);
    // if (this.email.invalid || this.password === ''){
    //   this.msgError = true;
    //   return;
    // }
    // this.appiService.login(this.email.value, this.password)
    //   .subscribe(res => {
    //     // console.log(res.data.token);
    //   })    
    //   // 
    //   // 
      
    //   //
  }
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

}
