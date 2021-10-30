import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { Person } from 'src/app/services/person';
import { RequesterService } from 'src/app/services/requester.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  password:string = '';
  people:Person[] = [];
  person = new Person();
  msgError:boolean = false;
  constructor(private appiService: RequesterService) { }
  
  ngOnInit(): void {
  }
  login(){
    if (this.email.invalid || this.password === ''){
      this.msgError = true;
      return;
    }
    this.appiService.login(this.email.value, this.password)
      .subscribe(res => {
        if (res.code) {
          
        }
        // console.log(res.data.token);
      })    
      // 
      // 
      
      //
  }
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

}
