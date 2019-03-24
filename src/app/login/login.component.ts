import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user:User;

  constructor(private apiservie:ApiService) { }

  ngOnInit() {
    this.user = new User();
  }
  login(data){
   console.log(data)
   this.apiservie.obtainAccessToken(data);
  }
  

}
