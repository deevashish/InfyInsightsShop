import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css']
})
export class MasterComponent implements OnInit {
  welcome:string;
  constructor(private router: Router) { }

  ngOnInit() {
    var data = JSON.parse(localStorage.getItem("currentUser"));
    if(data)
    {
      this.welcome="Welcome " + data["firstName"]
    }
  }

  logout()
  {    
    localStorage.removeItem("currentUser");
    this.welcome="";
    this.router.navigate(['/books']);
  }

}
