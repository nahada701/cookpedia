import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-saved-recipes',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,RouterLink],
  templateUrl: './saved-recipes.component.html',
  styleUrl: './saved-recipes.component.css'
})
export class SavedRecipesComponent {

  savedRecipe:any=[]
  constructor(private api:ApiService){}

  ngOnInit(){
    this.getSavedRecipes()
  }

  getSavedRecipes(){
    this.api.getSaveRecipeApi().subscribe((res:any)=>{
      console.log(res);
      this.savedRecipe=res
      
    })
  }

  removeRecipe(id:string){

    this.api.removeSaveRecipeApi(id).subscribe((res:any)=>{
      console.log(res);
      this.getSavedRecipes()
    })

  }

}
