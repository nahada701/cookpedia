import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent {

  recipeList:any=[]
  searchKey:string=""
  constructor(private api:ApiService){}
  ngOnInit(){
    this.getAllRecipe()
  }
  getAllRecipe(){
    this.api.getAllRecipeApi().subscribe((res:any)=>{
      this.recipeList=res
      console.log(res);
      
    })
  }

  deleteRecipe(id:string){
    this.api.deleteRecipeApi(id).subscribe({
      next:(res:any)=>{

        alert("Recipe removed success")
        this.getAllRecipe()
      },
      error:(reason:any)=>{
        alert(reason.error)
      }
    })

  }

}
