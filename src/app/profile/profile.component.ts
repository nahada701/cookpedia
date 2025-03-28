import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ApiService } from '../services/api.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  profilePic:string="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVV2t1C6KHKk0Hm9Rarw66ymEEWzBsAj02AQ&s"
  downloadList:any=[]
  ngOnInit(){
    this.getUserdownloadRecipe()
    const user=JSON.parse(sessionStorage.getItem("user")|| "")
    if(user.profilePic){
      this.profilePic=user.profilePic
    }

  }

  constructor(private api:ApiService){}


  getUserdownloadRecipe(){
    this.api.getUserdownlaodRecipeApi().subscribe((res:any)=>{
      this.downloadList=res
      console.log(this.downloadList,"list");
      console.log(res,"res");

      
      
    })
  }

  getFile(event: any) {
    let uploadFile = event.target.files[0];    
    const fr = new FileReader();
    fr.readAsDataURL(uploadFile);
    fr.onload = (event: any) => {
      console.log(event.target.result);
      this.profilePic = event.target.result;
    };
  }
  

  updateProfile(){
    this.api.editUserApi({profilePic:this.profilePic}).subscribe((res:any)=>{
      sessionStorage.setItem("user",JSON.stringify(res))
      this.profilePic=res.profilePic
      alert("Profile Updated Successfully")

    })
  }

}
