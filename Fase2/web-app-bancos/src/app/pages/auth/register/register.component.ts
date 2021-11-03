import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { RequesterService } from 'src/app/services/requester.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  private visibilidadPass:boolean = true;
  private visiConPass:boolean = true;
  private username:string = '';
  private email:FormControl = new FormControl('', [Validators.required, Validators.email]);
  private password:string = '';
  private confirmPassword: string = '';
  private msgError:boolean = false;
  private mensajeError:string = '';


  constructor(
    private appiService: RequesterService,
    private cookieService: CookieService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.cookieService.delete('token');
    this.cookieService.delete('username');
  }
  get MensajeError(): string {
    return this.mensajeError;
  }
  set Username(name:string) {
    this.username = name;
  }
  get VisibilidadPass(): boolean {
    return this.visibilidadPass;
  }
  set VisibilidadPass(vis:boolean) {
    this.visibilidadPass = vis;
  }
  get VisiConPass(): boolean {
    return this.visiConPass;
  }
  set VisiConPass(vis:boolean) {
    this.visiConPass = vis;
  }
  get Email(): FormControl {
    return this.email;
  }
  set Email(email:FormControl) {
    this.Email = email;
  }
  get Password(): string {
    return this.password;
  }
  set Password(password:string) {
    this.password = password;
  }
  get ConfirmPassword(): string {
    return this.confirmPassword;
  }
  set ConfirmPassword(password:string) {
    this.confirmPassword = password;
  }
  get MsgError(): boolean {
    return this.msgError;
  }
  register() {
    this.cookieService.set('token', this.email.value);
    this.cookieService.set('username', this.password);
    if (this.username === '') {
      this.msgError = true;
      this.mensajeError = 'Nombre inválido';
      return;
    }
    if (this.email.invalid) {
      this.msgError = true;
      this.mensajeError = 'Correo inválido';
      return;
    }
    if (this.password.length < 5) {
      this.msgError = true;
      this.mensajeError = 'La contraseña debe tener una longitud mayor que 8';
      return;
    }
    if (this.password !== this.confirmPassword) {
      this.msgError = true;
      this.mensajeError = 'Las contraseñas no coinciden';
      return;
    }
    this.appiService.register(this.username, this.email.value, this.password)
      .subscribe(res => {
        if (res.status === 'success' && res.data &&res.data.token && res.data.username) {
          this.cookieService.set('username', res.data.username);
          this.router.navigate(['principal']);
          return;
        }
        this.msgError = true;
        this.mensajeError = (res.code || '') + (res.message || '');
      });
  }
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
}
