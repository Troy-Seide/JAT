import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HelperServiceService } from '../helper-service.service';
import { Applications } from '../Models/applications';
import { jwtDecode } from 'jwt-decode';
import { map } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  //currentRate = 2;
  jobs:Applications[];
  filterApps: Applications[];
  tokenInfo:any = jwtDecode(localStorage.getItem('token'));
  id = this.tokenInfo['subject'];
  words:String
  arr:any;
  isFavorite: { [key: string]: boolean } = {};
  other: any;
  check:any

  constructor(public helperService: HelperServiceService, private cdr: ChangeDetectorRef){
    //this.id = this.tokenInfo['subject'];
  }

  ngOnInit(): void {
    this.helperService.getAllJobs()
  .pipe( map((jobs: any[]) => jobs.filter(job => job.userId === this.id))).subscribe(filteredJobs => {
    this.jobs = filteredJobs;
  });
    // var j = 0;
    // this.helperService.getAllJobs().subscribe(res=> {
    //   this.jobs = res;
    //   for(var i = 0; i<this.jobs.length; i++){
    //     if(this.jobs[i].userId === this.id){
    //       this.jobs.filter(item => item.userId === this.id)
    //       //this.filterApps.push(this.jobs[i]);
    //       // this.filterApps.push(this.jobs[i]);
    //       // alert(this.jobs[i].companyName)
    //      // this.filterApps[j] = this.jobs[i];
    //       //alert(this.filterApps[0])
    //       //j++;
    //     }
    //   }
    //   // if(res.userId === id){
        
    //   //  }
    // });
    this.helperService.getFavoriteJobs(this.id).subscribe(res=>{
      this.arr = res.favoriteJobIds;
    })
    this.loadJobs();
    
  }

  addJob(){
    // this.helperService.postJob(this.job).subscribe(res=>{

    // })
  }

  editJob(){
    //this.helperService.editApplication(this.app)
  }

  deleteJob(num){
    if(confirm('Are you sure you want to delete this application posting?')){
      this.helperService.deleteApplication(this.jobs[num]._id).subscribe(res =>{
        this.jobs.splice(num,1);
      })
    }
    
  }
  addOrRemoveFav(num){
    //this.helperService.addToFavorites(this.jobs[num]);
    if(this.isFavorites(this.jobs[num]._id)){
      this.helperService.removeFromFavorites(this.id, this.jobs[num]._id).subscribe(res=>{
        alert('Job removal occurred');
      })
    }
    else{
      this.helperService.addToFavorites(this.id, this.jobs[num]._id).subscribe(res=>{
        alert('Job addition occurred');
      })
    }

  }
  isFavorites(jobId){
    this.helperService.getFavoriteJobs(this.id).subscribe(res=>{
      this.arr = res.favoriteJobIds;
    })
    // alert('This is a test');
    // alert(this.arr.includes(jobId));
    // return this.arr.includes(jobId)
      if(this.arr.includes(jobId)){
        return true;
      }
      else{
        return false;
      }
  //   })
  //   return false;
  // }

  }

// toggleFavorite(jobId: string): void {
//     if (this.isFavorite[jobId]) {
//         this.removeFromFavorites(jobId);
//     } else {
//         this.addToFavorites(jobId);
//     }
// }

// addToFavorites(jobId: string): void {
//   this.helperService.addToFavorites(this.id, jobId).subscribe(
//       (response) => {
//           console.log('Job added to favorites:', jobId);
//           // Update local state
//           this.isFavorite[jobId] = true;
//       },
//       (error) => {
//           console.error('Error adding job to favorites:', error);
//       }
//   );
// }

// removeFromFavorites(jobId: string): void {
//   this.helperService.removeFromFavorites(this.id, jobId).subscribe(
//       (response) => {
//           console.log('Job removed from favorites:', jobId);
//           // Update local state
//           this.isFavorite[jobId] = false;
//       },
//       (error) => {
//           console.error('Error removing job from favorites:', error);
//       }
//   );
// }


loadJobs(): void {
  // Fetch job data
  this.helperService.getFavoriteJobs(this.id).subscribe(res => {
      this.other = res.favoriteJobIds; // Store job data

      // Iterate over job data to initialize isFavorite map
      this.other.forEach((fav_id) => {
        this.isFavorite[fav_id] = true; // Assuming isFavorite is a property in job object
      });
      this.cdr.detectChanges();
    },
  );
}


toggleFavorited(jobId){
  // this.helperService.getFavoriteJobs(this.id).subscribe(res=>{
  //   this.arr = res.favoriteJobIds;
  // })
  // alert('This is a test');
  // alert(this.arr.includes(jobId));
  // return this.arr.includes(jobId)
    if(this.arr.includes(jobId)){
      //this.check = true;
      //this.removeFromFavorites(jobId);
      return true;
    }
    else{
      //this.addToFavorites(jobId)
      //this.check = false;
      return false;
    }
//   })
//   return false;
// }

}
//Working set
toggleFavorites(jobId){
  // this.helperService.getFavoriteJobs(this.id).subscribe(res=>{
  //   this.arr = res.favoriteJobIds;
  // })
  // alert('This is a test');
  // alert(this.arr.includes(jobId));
  // return this.arr.includes(jobId)
    if(this.arr.includes(jobId)){
      this.removeFromFavorites(jobId);
    }
    else{
      this.addToFavorites(jobId)
    }
//   })
//   return false;
// }

}
toggle(jobId){
  if(this.arr.includes(jobId)){
    this.helperService.removeFromFavorites(this.id, jobId).subscribe(res=>{
    });
    return true;
  }
  else{
    this.helperService.addToFavorites(this.id, jobId).subscribe(res =>{
    });
    return false;
  }
  //return this.arr.includes(jobId);
}
toggleFavoritez(num): void {
  if (this.isFavorite[this.jobs[num]._id]) {
    alert('made it here')
      this.removeFromFavorites(num);
  } else {
    alert('or made it here')
      this.addToFavorites(num);
  }
}

toggleFavorite(jobId: string): void {
  alert('hello in here')
  // alert(this.isFavorite[0])
  
  if (this.isFavorite[jobId]) {
    this.removeFromFavorites(jobId);
    window.location.reload();
    //this.cdr.detectChanges();
  } else {
    this.addToFavorites(jobId);
    window.location.reload()
    //this.cdr.detectChanges();
  }
}

addToFavorites(jobId): void {
  this.helperService.addToFavorites(this.id, jobId).subscribe(res => {
          //console.log('Job added to favorites:', this.jobs[num].companyName);
          // Update UI immediately after successful addition
          this.isFavorite[jobId] = true; // Update the local state
          this.cdr.detectChanges();
  });
}

removeFromFavorites(jobId): void {
  this.helperService.removeFromFavorites(this.id, jobId).subscribe(res => {
          //console.log('Job removed from favorites:', this.jobs[num].companyName);
          // Update UI immediately after successful removal
          this.isFavorite[jobId] = false; // Update the local state
          this.cdr.detectChanges();
      });
  }

}

// $scope.toggleFavorite = function(jobId) {
//   if ($scope.isFavorite(jobId)) {
//       UserService.removeFromFavorites($scope.userId, jobId).then(function(response) {
//           // Handle success
//           console.log('Job removed from favorites:', jobId);
//       }, function(error) {
//           // Handle error
//           console.error('Error removing job from favorites:', error);
//       });
//   } else {
//       UserService.addToFavorites($scope.userId, jobId).then(function(response) {
//           // Handle success
//           console.log('Job added to favorites:', jobId);
//       }, function(error) {
//           // Handle error
//           console.error('Error adding job to favorites:', error);
//       });
//   }
// };

// $scope.isFavorite = function(jobId) {
//   return $scope.userFavorites.includes(jobId);
// };