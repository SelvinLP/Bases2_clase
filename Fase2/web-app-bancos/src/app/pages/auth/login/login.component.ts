import { Component, OnInit } from '@angular/core';
import {Form, FormControl, Validators} from '@angular/forms';
import { RequesterService } from 'src/app/services/requester.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private visiPass:boolean = true;
  private email:FormControl = new FormControl('', [Validators.required, Validators.email]);
  private password:string = '';
  private msgError:boolean = false;
  private mensajeError:string = '';

  get MensajeError(): string {
    return this.mensajeError;
  }
  get VisiPass():boolean {
    return this.visiPass;
  }
  set VisiPass(visi:boolean) {
    this.visiPass = visi;
  }
  get Email():FormControl {
    return this.email;
  }
  set Email(email:FormControl) {
    this.email = email;
  }
  get Password():string {
    return this.password;
  }
  set Password(pass:string) {
    this.password = pass;
  }
  get MsgError(): boolean {
    return this.msgError;
  }
  constructor(
    private appiService: RequesterService,
    private cookieService: CookieService,
    private router: Router,
  ) { }
  
  ngOnInit(): void {
    this.cookieService.delete('token');
    this.cookieService.delete('username');
  }
  login(){
    this.cookieService.set('token', this.email.value);
    this.cookieService.set('username', this.password);
    if (this.email.invalid || this.password === ''){
      this.msgError = true;
      this.mensajeError = 'Correo y contraseña inválidos';
      return;
    }
    this.appiService.login(this.email.value, this.password)
      .subscribe(res => {
        console.log('entra');
        this.cookieService.set('token', 'TokenAqui');
        this.cookieService.set('username', 'Kathy');
        this.router.navigate(['principal']);
        // if (res.status === 'success' && res.data && res.data.token && res.data.username) {
        //   this.cookieService.set('token', res.data.token);
        //   this.cookieService.set('username', res.data.username);
        //   // this.cookieService.set('username', res.data?.username || '');
        //   this.router.navigate(['principal']);
        //   console.log(res.data?.token);
        //   return;
        // }
        // this.msgError = true;
        // this.mensajeError = (res.code || '') + (res.message || '');
      });
      // 
      // 
      
      //
  }
  // getErrorCredentiales(mensaje:string){
  //   return mensaje;
  // }
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

}
