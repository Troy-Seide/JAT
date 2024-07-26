import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { User } from './Models/user';
import { Applications } from './Models/applications';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HelperServiceService {

  favJobs:Applications[] = [];
  headers: HttpHeaders
  constructor(private client: HttpClient, private router: Router) { 
    this.headers = new HttpHeaders({'content-type': 'application/json'});
  }

  login(username:string, password:string){
    if(username === 'suern' && password === '1234'){
      return 200;
    }
    else{
      return 403;
    }
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['login'])
  }

  getAllJobs():Observable<Applications[]>{
    return this.client.get<Applications[]>(env.apiAddress + '/jobs/')
  }

  loginUser(user:User): Observable<HttpResponse<any>>{
    return this.client.post<any>(env.apiAddress + '/user/login', user);
  }

  postJob(jobApp: Applications): Observable<HttpResponse<any>>{
    return this.client.post<any>(env.apiAddress + '/jobs/add', JSON.stringify(jobApp), {headers:this.headers, observe:'response'});
  }

  AddUser(user: User): Observable<HttpResponse<any>>{
    return this.client.post<HttpResponse<any>>(env.apiAddress+'/user/register', JSON.stringify(user), {headers:this.headers, observe:'response'})
  }
  
  deleteApplication(id: Applications){
    return this.client.delete<HttpResponse<any>>(env.apiAddress + '/jobs/' + id)
  }

  editApplication(application:Applications){
    return this.client.put(env.apiAddress + '/jobs/' + application._id, JSON.stringify(application), {headers: this.headers, observe: 'response'});
  }

  getApplication(id: String): Observable<Applications>{
    return this.client.get<Applications>(env.apiAddress + '/jobs/' + id);
  }

  // addToFavorites(app: Applications){
  //   // var favJobs:Applications[];
  //   if(!this.favJobs.includes(app)){
  //     alert('This job has been added to favorites!')
  //     this.favJobs.push(app);
  //   }
  // }

  // getFavJobs(){
  //   return this.favJobs;
  // }


  addToFavorites(userId:String, jobId:String): Observable<HttpResponse<any>> {
    alert('Application added to favorites');
    // alert(userId);
    // alert(jobId);
    return this.client.post<HttpResponse<any>>(env.apiAddress + '/user/users/' + userId + '/favorites/' + jobId, {headers:this.headers, observe:'response'});
  };

  removeFromFavorites(userId:String, jobId:String): Observable<HttpResponse<any>> {
    // alert(userId)
    // alert(jobId)
    alert('Application removed from favorites');
    return this.client.delete<HttpResponse<any>>(env.apiAddress + '/user/users/' + userId + '/favorites/' + jobId, {headers:this.headers, observe:'response'});
  };

  getFavoriteJobs(id: String): Observable<any>{
    return this.client.get<HttpResponse<any>>(env.apiAddress + '/user/users/' + id + '/favorites');
    
  }



  // getUser(id: String):Observable<User> {
  //   return this.client.get<User>(env.apiAddress + '/user/' + id);

  // }
}

// UpdateUser(user: User): Observable<HttpResponse<any>> {
//   return this.client.put(env.apiAddress + '/user/' + user._id, JSON.stringify(user), 
//   {headers: this.headers, observe: 'response'});
// }

// DeleteUser(id:String): Observable<HttpResponse<any>> { 
//   return this.client.delete<HttpResponse<any>>(env.apiAddress + '/user/' + id, {observe: 'response'});
// }