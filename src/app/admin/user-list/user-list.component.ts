import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {

  constructor(private api:ApiService){

  }

  allUsers:any=[]
  
  ngOnInit(){
    this.getUserList()
  }

  getUserList(){
    this.api.getUserListApi().subscribe((res:any)=>{
     this.allUsers=res 
      
    })

  }
}
