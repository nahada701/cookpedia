import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ApiService } from '../services/api.service';
import { SearchPipe } from '../pipes/search.pipe';
import {FormsModule} from '@angular/forms'
import {NgxPaginationModule} from 'ngx-pagination'
import { Router } from '@angular/router';
@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,SearchPipe,FormsModule,NgxPaginationModule],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent {

  allRecipes:any=[]
  dummyAllRecipes:any=[]
  cuisineArray:any=[]
  mealTypeArray:any=[]
  searchKey:string=""
  p: number=1


  constructor(private api:ApiService,private router:Router){}

  ngOnInit(){
    this.getAllRecipes()
  }
  getAllRecipes(){
    this.api.getAllRecipeApi().subscribe((res:any)=>{
      this.allRecipes=res
      this.dummyAllRecipes=res  
      this.allRecipes.forEach((recipe:any) => {
        !this.cuisineArray.includes(recipe.cuisine) &&
          this.cuisineArray.push(recipe.cuisine)
        

        this.allRecipes.forEach((recipe:any)=>{
          recipe.mealType.forEach((meal:string)=>{
            !this.mealTypeArray.includes(meal) && this.mealTypeArray.push(meal)
          })
          
          
        })
      

       
       
      });
      
    })
    }

    filterRecipes(key:string , value:string){

      // eg: mealtype  lunch
      if(key=='mealType'){
        this.allRecipes=this.dummyAllRecipes.filter((recipe:any)=>{
          return recipe[key].includes(value)})
        
      }
      else{
       this.allRecipes=this.dummyAllRecipes.filter((recipe:any)=>{
       return recipe[key]==value})

        console.log(this.allRecipes);}
        

    }
   
    viewRecipe(recipeId:string){
      if(sessionStorage.getItem("token")){
        this.router.navigateByUrl(`/view/recipe/${recipeId}`)

      }else{
        alert("plase login to get full acces to recipe detials")
        this.router.navigateByUrl("/login")
      }
    }

  


}
