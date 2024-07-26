import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HelperServiceService } from '../helper-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private router: Router, private helperService: HelperServiceService){

  }

  goHome(){
    this.router.navigate(['home']);
  }

  logout(){
    this.helperService.logout()
  }

}
