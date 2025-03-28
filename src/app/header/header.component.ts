import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {


  isLogedin:boolean=false
  logedinUsername:string=""


  constructor(private router:Router){}
  ngOnInit(){
   if(sessionStorage.getItem("token") && sessionStorage.getItem("user")){
    this.isLogedin=true
    this.logedinUsername=JSON.parse(sessionStorage.getItem("user")|| "").username
   }
   else{
    this.isLogedin=false
    this.logedinUsername=""
   }

  }

  
  logout(){
    sessionStorage.clear()
    this.isLogedin=false
    this.logedinUsername=""
    this.router.navigateByUrl("/")
  }
}
