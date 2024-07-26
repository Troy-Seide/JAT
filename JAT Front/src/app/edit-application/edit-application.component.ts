import { Component, OnInit } from '@angular/core';
import { HelperServiceService } from '../helper-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Applications } from '../Models/applications';

@Component({
  selector: 'app-edit-application',
  templateUrl: './edit-application.component.html',
  styleUrls: ['./edit-application.component.scss']
})
export class EditApplicationComponent implements OnInit {

  jobApp:Applications

  constructor(private helperService: HelperServiceService, private router: Router, private route: ActivatedRoute){
    this.jobApp = new Applications();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
    let id = params['id'];
    this.helperService.getApplication(id).subscribe(res=>{
      this.jobApp = res;
    })
  })
}

  updateJob(){
    this.helperService.editApplication(this.jobApp).subscribe(res =>{
      alert(res);
      this.router.navigate(['home']);
    })
  }
}