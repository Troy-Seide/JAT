import { Component, OnInit } from '@angular/core';
import { HelperServiceService } from '../helper-service.service';
import { Router } from '@angular/router';
import { User } from '../Models/user';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  username:string = "";
  password:string = "";
  errorMsg:string = "";
  logUser:User;
  check:any = "";

  constructor(private helperService:HelperServiceService, private router: Router){
    this.logUser = new User();

  }

  ngOnInit(): void {
    
  }

  login(){
    // if(this.username.trim().length === 0){
      //alert('button clicked')
    if(this.logUser.email === undefined){
      this.errorMsg = "Username is required";
    }
    // else if (this.password.trim().length === 0){
    else if (this.logUser.password === undefined){
      this.errorMsg = "Password is required"; 
    }
    else{
      this.errorMsg = "";
      this.helperService.loginUser(this.logUser).subscribe(res=>{
        localStorage.setItem('token', res['token']);
        //you just commented this our
        const tokenInfo = jwtDecode(localStorage.getItem('token'));
        var id = tokenInfo['subject'];
        alert(id);
        alert(localStorage.getItem('token'))
        if(localStorage.getItem('token') !== undefined){
          this.router.navigate(['home'])
          this.check = true
          //   }
        }
        else{
          this.errorMsg = "incorret login"
        }
      })

    //   let res = this.helperService.login(this.username, this.password);
    //   if(res === 200){
    //     this.router.navigate(['home'])
    //   }
    //   if(res === 403){
    //     this.errorMsg = "Invalid Credentials";
    //   }
    }
  }


}
