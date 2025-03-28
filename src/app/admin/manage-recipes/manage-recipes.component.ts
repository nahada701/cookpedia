import { Component, Input, input } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { RecipeModel } from '../model/recipe-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-recipes',
  templateUrl: './manage-recipes.component.html',
  styleUrl: './manage-recipes.component.css'
})
export class ManageRecipesComponent {
  @Input() id ! :string
  cuisineArray:any=[]
  mealTypeArray:any=[]
  recipeDetails:RecipeModel={}
  ingredientArray:any=[]
  instructionArray:any=[]
  selectedMealTypeArray:any=[]

  constructor(private api:ApiService,private router:Router){}

  ngOnInit(){
    this.getAllRecipes()
  }
  getAllRecipes(){
    this.api.getAllRecipeApi().subscribe((res:any)=>{


      if(this.id){
        this.recipeDetails=res.find((item:any)=>item._id=this.id)
        console.log(this.recipeDetails);
        this.ingredientArray=this.recipeDetails.ingredients
        this.instructionArray=this.recipeDetails.instructions
        this.selectedMealTypeArray=this.recipeDetails.mealType



      }
       
      res.forEach((recipe:any) => {
        !this.cuisineArray.includes(recipe.cuisine) &&
          this.cuisineArray.push(recipe.cuisine)
        

        res.forEach((recipe:any)=>{
          recipe.mealType.forEach((meal:string)=>{
            !this.mealTypeArray.includes(meal) && this.mealTypeArray.push(meal)
          })
          
          
        })
      

       
       
      });
      console.log(this.cuisineArray,this.mealTypeArray);
      
    })
    }

  addIngredient(inputValue:any){
    if(inputValue.value){
      this.ingredientArray.push(inputValue.value)
      inputValue.value=''
      console.log(this.ingredientArray);
      
    }
    }

    deleteIngredient(ingredient:any){
     this.ingredientArray= this.ingredientArray.filter((value:any)=>value!=ingredient)
    }

    addInstructions(inputValue:any){
      if(inputValue.value){
        this.instructionArray.push(inputValue.value)
        inputValue.value=''
        console.log(this.instructionArray);
        
      }
      }
  
    deleteInstructions(instruction:any){
       this.instructionArray= this.instructionArray.filter((value:any)=>value!=instruction)
      }

    addMealType(event:any){
      if(event.target.checked){
   
       ! this.selectedMealTypeArray.includes(event.target.name) &&  this.selectedMealTypeArray.push(event.target.name)
        
      }else{
        this.selectedMealTypeArray=this.selectedMealTypeArray.filter((meal:any)=>meal!=event.target.name)
      }
      console.log(this.selectedMealTypeArray);
      
      }

      addRecipe(){

        this.recipeDetails.ingredients=this.ingredientArray
        this.recipeDetails.instructions=this.instructionArray
        this.recipeDetails.mealType=this.selectedMealTypeArray

        console.log(this.recipeDetails);

        const{name,ingredients,instructions,prepTimeMinutes,cookTimeMinutes,servings,difficulty,caloriesPerServing,image,mealType}=this.recipeDetails
        
        if(name&& ingredients!.length>0&& instructions!.length>0&&prepTimeMinutes&&cookTimeMinutes&&servings&&difficulty&&caloriesPerServing&&image&&mealType!.length>0 ){
          this.api.addRecipeApi(this.recipeDetails).subscribe({
            next:(res:any)=>{
              this.instructionArray=[]
              this.ingredientArray=[]
              this.selectedMealTypeArray=[]
              this.router.navigateByUrl('/admin/recipe-list')
            },error:(reason:any)=>{
              alert(reason.error)
              this.recipeDetails.name=""
            }
          })
        }
        else{
          alert("Please fill all the details")
        }
        
      }
      updateRecipe(){

        this.recipeDetails.ingredients=this.ingredientArray
        this.recipeDetails.instructions=this.instructionArray
        this.recipeDetails.mealType=this.selectedMealTypeArray

        console.log(this.recipeDetails);

        const{name,ingredients,instructions,prepTimeMinutes,cookTimeMinutes,servings,difficulty,caloriesPerServing,image,mealType}=this.recipeDetails
        
        if(name&& ingredients!.length>0&& instructions!.length>0&&prepTimeMinutes&&cookTimeMinutes&&servings&&difficulty&&caloriesPerServing&&image&&mealType!.length>0 ){
          this.api.editRecipeApi(this.id,this.recipeDetails).subscribe({
            next:(res:any)=>{
              alert("Recipe Updated Succsessfully")
              this.recipeDetails={}
              this.instructionArray=[]
              this.ingredientArray=[]
              this.selectedMealTypeArray=[]
              this.router.navigateByUrl("/admin/recipe-list")
            },
            error:(reason:any)=>{
              console.log(reason.error);
              
            }
          })
        }
        else{
          alert("Please fill all the details")
        }
        
      }
    
    removeMealType(meal:string){
      this.selectedMealTypeArray=this.selectedMealTypeArray.filter((item:any)=>item!=meal)
    }

}
