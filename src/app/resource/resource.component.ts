import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Employee } from '../models/employee';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.css']
})
export class ResourceComponent implements OnInit {

  resourceData:any;
  public foo = new Employee(1,'sample foo');
    private foosUrl = 'http://localhost:8083/oauth-resource/employee/';  
    private barUrl = 'http://localhost:8083/oauth-resource/manager/'; 

  constructor(private apiService:ApiService) { }

  ngOnInit() {
    this.resourceData = this.apiService.getDecodedAccessToken(localStorage.getItem('access_token'));
  }
  getEmployeeData(){
    this.apiService.getResource(this.foosUrl+this.foo.id,this.foo)
      .subscribe(
        data => this.foo = data,
        error =>  this.foo.name = error.error.error_description
      );
}
getManagerData(){
  this.apiService.getResource(this.barUrl+this.foo.id,this.foo)
    .subscribe(
      data => this.foo = data,
      error =>  this.foo.name = error.error.error_description
    );
}

}
