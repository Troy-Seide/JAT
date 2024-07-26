import { Component, OnInit } from '@angular/core';
import { Applications } from '../Models/applications';
import { HelperServiceService } from '../helper-service.service';
import { NgForm } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-info',
  templateUrl: './job-info.component.html',
  styleUrls: ['./job-info.component.scss']
})
export class JobInfoComponent implements OnInit {
  jobApp:Applications
  tokenInfo:any = jwtDecode(localStorage.getItem('token'));
  id = this.tokenInfo['subject'];
  other = JSON.stringify(this.id);
  dateApplied = Date.now();
    // userId: String;
    // companyName:String;
    // position:String;
    // description:String;
    // location:String
    // status: {
    //     type: String,
    //     enum: ['Applied', 'Interviewing', 'Offered', 'Rejected'],
    //     default: 'Applied'
    // }
    // dateApplied: Date
  constructor(private helperService: HelperServiceService, private router: Router){
    this.jobApp = new Applications();
  }


  ngOnInit(): void {
    // this.jobApp.status.enum[0]
  }

  addJob(){
    alert('cool');
    this.jobApp.userId = this.id;
      this.helperService.postJob(this.jobApp).subscribe(res=>{
        alert(res.body);
    })
    this.router.navigate(['/home'])
  }
}
