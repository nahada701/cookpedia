import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterLink } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  allRecipes:any=[]
  allTestimonails:any=[]

  constructor(private api:ApiService){ }

  ngOnInit(){
    this.getAllRecipes()
    this.getAllTestimonials()
  }

  getAllRecipes(){
    this.api.getAllRecipeApi().subscribe((res:any)=>{
      this.allRecipes=res.splice(0,6)
      
    })
  }

  getAllTestimonials(){
    this.api.getAllApprovedTestimonialsApi().subscribe((res:any)=>{
      this.allTestimonails=res
      console.log(this.allTestimonails);
      
    })
  }
}
