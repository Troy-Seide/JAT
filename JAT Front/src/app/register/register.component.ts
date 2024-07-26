import { Component, OnInit } from '@angular/core';
import { HelperServiceService } from '../helper-service.service';
import { User } from '../Models/user';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{

  user: User
  constructor(private helperService: HelperServiceService, private router: Router){
    this.user = new User();
  }

  ngOnInit(): void {

  }

  registerUser(form: NgForm){
    this.helperService.AddUser(this.user).subscribe(res => {
      alert(res.body.token)
      //if(res.status === 201){
        localStorage.setItem('token', res.body.token);
        this.router.navigate(['home']);
        //alert('got here')
      //}
    })
  }
}
