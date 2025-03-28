import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../services/api.service';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import jspdf from 'jspdf'
import autoTable from 'jspdf-autotable'
@Component({
  selector: 'app-view-recipe',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,RouterLink],
  templateUrl: './view-recipe.component.html',
  styleUrl: './view-recipe.component.css'
})
export class ViewRecipeComponent {
  recipeId:string=""
  recipe:any={}
  allRelatedRecipes:any=[]
    constructor(private route:ActivatedRoute,private api:ApiService){}
  ngOnInit(){
    this.route.params.subscribe((res:any)=>{
      this.recipeId=res.id
      this.getSingleRecipe(this.recipeId)
   
   
    })
    

  }

  getSingleRecipe(recipeId:string){
    this.api.viewRecipeApi(recipeId).subscribe((res:any)=>{
      console.log(res);
      
      this.recipe=res
      this.getRelatedRecipe(res.cuisine)
    })
  }

  getRelatedRecipe(cuisine:string){
    this.api.relatedRecipeApi(cuisine).subscribe((res:any)=>{
      console.log(res);
      if(res.length>1){
        this.allRelatedRecipes=res.filter((item:any)=>item.name!==this.recipe.name)

      }else{
        this.allRelatedRecipes=[]
      } 
    })
  }

  saveRecipe(){
    this.api.saveRecipeApi(this.recipeId,this.recipe).subscribe({
      next:(res:any)=>{
        alert("Recipe added successfully")
      },error:(reason:any)=>{
        alert(reason.error)
      }
      
    })
  }

  generatePdf(){
    const pdf=new jspdf
    pdf.setFontSize(16)
    pdf.setTextColor("red")
    pdf.text(this.recipe.name,10,10,)
    pdf.setFontSize(13)
    pdf.setTextColor("orange")
    pdf.text(`Cuisine: ${this.recipe.cuisine}`,10,20)
    pdf.text(`Servings: ${this.recipe.servings}`,10,25)
    pdf.text(`Mode of cooking: ${this.recipe.difficulty}`,10,30)
    pdf.text(`Preperation time : ${this.recipe.prepTimeMinutes}`,10,35)
    pdf.text(`Cooking time: ${this.recipe.cookTimeMinutes}`,10,40)
    pdf.text(`Total calories: ${this.recipe.caloriesPerServing}`,10,45)
    
    let head=[['Incredients','Cooking Instructions']]
    let body=[]
    body.push([this.recipe.ingredients,this.recipe.instructions])
    autoTable(pdf,{head,body,startY:55})
    pdf.output('dataurlnewwindow')
    pdf.save('downlaod-recipe.pdf')
  }
  
  downlaodRecipe(){
    this.api.downlaodRecipeApi(this.recipeId,this.recipe).subscribe((res:any)=>{
      this.api.getChartData()
      this.generatePdf()
    })
  }
}
