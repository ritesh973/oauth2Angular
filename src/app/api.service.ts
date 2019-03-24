import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '../../node_modules/@angular/common/http';
import { Router } from '../../node_modules/@angular/router';
import * as jwt_decode from "jwt-decode";
import { Observable } from '../../node_modules/rxjs';
import { Employee } from './models/employee';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient,private  router: Router) { }

  obtainAccessToken(loginData){
    let headers = new HttpHeaders({'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
      'Authorization': 'Basic '+btoa(loginData.clientId+":"+loginData.secret)});
      const httpOptions = {
        headers: headers,
      };
      const params = new HttpParams({
        fromObject: {
          grant_type: 'password',
          username: loginData.username,
          password: loginData.password,
          client_id:loginData.clientId,
        }
      });
  return this.http.post<any>('http://localhost:8082/oauth-server/oauth/token',params,httpOptions)
            .subscribe(data => this.saveToken(data),
                       err => alert('Invalid Credentials') 
                      );
 }
saveToken(data){
  localStorage.setItem('access_token',data.access_token);
  this.router.navigate(['/']);
};
logout() {
  localStorage.removeItem('access_token');
}
getDecodedAccessToken(token: string): any {
  try{
      return jwt_decode(token);
  }
  catch(Error){
      return null;
  }
}
getResource(resourceUrl,employee): Observable<any>{
  var headers = new HttpHeaders({'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
    'Authorization': 'Bearer '+localStorage.getItem('access_token')});
  return this.http.get(resourceUrl, { headers: headers });
}
}
