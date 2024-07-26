import { Component, OnInit } from '@angular/core';
import { Applications } from '../Models/applications';
import { HelperServiceService } from '../helper-service.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  words:String;
  jobs:Applications[]
  favorites:any[] = [];
  word: any;
  tokenInfo:any = jwtDecode(localStorage.getItem('token'));
  id = this.tokenInfo['subject'];
  constructor(private helperService: HelperServiceService){

  }

  ngOnInit(): void {
    //this.jobs = this.helperService.getFavJobs();
    this.helperService.getFavoriteJobs(this.id).subscribe(res =>{
      this.word = res.favoriteJobIds
      this.word.forEach(element => {
        this.helperService.getApplication(element).subscribe(ans =>{
          this.favorites.push(ans);
        })
      });
    
  })
}

removeFavorite(jobId){
  this.helperService.removeFromFavorites(this.id, jobId).subscribe(res =>{
    // this.favorites = this.favorites.filter(application => application._id !== jobId);
    const index = this.favorites.findIndex(application => application._id === jobId);
  
  // If the application exists in the favorites array, remove it
    if (index !== -1) {
      this.favorites.splice(index, 1);
    }
  })
  window.location.reload()
}

  // favoriteJobs(){
  //   this.jobs = this.helperService.getFavJobs();
    
  //}

  // check(){
  //   alert(this.id)
  //   this.helperService.getFavoriteJobs(this.id).subscribe(res =>{
  //     this.word = res.favoriteJobIds
  //     alert(this.word[0])

  //     console.log(this.word);
  //      //console.log(JSON.stringify(res).at(2));
  //     //  this.word = JSON.stringify(res);
  //     //  alert(this.word);
  //     //  atob(this.word.split('.')[1])
  //     //console.log(res);
  //     //this.other = res;
  //     //this.other = JSON.stringify(res);
  //     //console.log(JSON.parse(this.other['']));
  //     //console.log(this.other[0]);
  //     //console.log(this.other['favoriteJobIds'])
  //     //this.other = res;
  //     //console.log(this.other)
  //   })
  // }
}

