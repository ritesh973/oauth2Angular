import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  statusMessage:string='';

  constructor(private apiService:ApiService,private  router: Router) { }

  ngOnInit() {
    if(localStorage.getItem('access_token')){
      this.statusMessage = 'You are Logged in with Token '+localStorage.getItem('access_token')
    }else{
      this.statusMessage = "You are not logged in"
    }
  }
  logout(){
    this.apiService.logout();
    location.reload();
  }
  navigateToResource(){
    if(localStorage.getItem('access_token')){
      this.router.navigate(['/resource']);

    }else{
      this.statusMessage = "Please Login first."
    }
  }
  

}
