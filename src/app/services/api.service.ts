import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
serverUrl:string="https://cookpedia-backend-q5t9.onrender.com"
// ""
  constructor(private http:HttpClient) { }
  //to create reqHeader create an object in the class httpheader
  //and append token to that object 
  appendToken(){
    let headers=new HttpHeaders()
    const token=sessionStorage.getItem("token")
    if (token){
     headers= headers.append("authorization",`Bearer ${token}`)
    }
    return {headers}
  }

  getAllRecipeApi(){
    return this.http.get(`${this.serverUrl}/all-recipe`)
  }

  addTesitmonyApi(reqBody:any){
    return this.http.post(`${this.serverUrl}/add-testimony`,reqBody)
  }

  registerUserApi(reqBody:any){
    return this.http.post(`${this.serverUrl}/register`,reqBody)
  }

  loginUserApi(reqBody:any){
    return this.http.post(`${this.serverUrl}/login`,reqBody)
  }

  viewRecipeApi(recipeId:string){
    return this.http.get(`${this.serverUrl}/recipe/view/${recipeId}`,this.appendToken())
  }

  relatedRecipeApi(cuisine:string){
    return this.http.get(`${this.serverUrl}/related-recipes?cuisine=${cuisine}`,this.appendToken())
  }

  saveRecipeApi(recipeId:string,reqBody:any){
    return this.http.post(`${this.serverUrl}/save/recipe/${recipeId}`,reqBody,this.appendToken())
  }

  getSaveRecipeApi(){
    return this.http.get(`${this.serverUrl}/user-saved-recipes`,this.appendToken())
  }
  removeSaveRecipeApi(id:string){
    return this.http.delete(`${this.serverUrl}/remove/save/recipe/${id}`,this.appendToken())
  }
  downlaodRecipeApi(id:string,reqbody:any){
    return this.http.post(`${this.serverUrl}/download/recipe/${id}`,reqbody,this.appendToken())

  }
  getUserdownlaodRecipeApi(){
    return this.http.get(`${this.serverUrl}/user-downlaods`,this.appendToken())

  }
  editUserApi(reqBody:any){
    return this.http.post(`${this.serverUrl}/user-edit`,reqBody,this.appendToken())

  }
  getUserListApi(){
    return this.http.get(`${this.serverUrl}/get-userlist`,this.appendToken())

  }
  getAllTestimonialsApi(){
    return this.http.get(`${this.serverUrl}/get-alltestimonials`,this.appendToken())

  }

  getAllApprovedTestimonialsApi(){
    return this.http.get(`${this.serverUrl}/approved-testimonials`,this.appendToken())

  }

  
  editTestimonialStatussApi(feedback:string,status:string){
    return this.http.put(`${this.serverUrl}/update-testiminy/${feedback}?status=${status}`,this.appendToken())

  }

  getAlldownlaodRecipeApi(){
    return this.http.get(`${this.serverUrl}/all-downlaods`,this.appendToken())

  }

  addRecipeApi(reqBody:any){
    return this.http.post(`${this.serverUrl}/add/recipe`,reqBody,this.appendToken())

  }

  editRecipeApi(id:any,reqBody:any){
    return this.http.post(`${this.serverUrl}/edit/recipe/${id}`,reqBody,this.appendToken())

  }
 
  deleteRecipeApi(id:any){
    return this.http.delete(`${this.serverUrl}/delete/recipe/${id}`,this.appendToken())

  }

  getChartData(){
    this.getAlldownlaodRecipeApi().subscribe((res:any)=>{
      let downloadArray=[]
          const cuisineObject=res.reduce((acc:any,download:any)=>{
            if(!acc[download.recipeCuisine]){
              acc[download.recipeCuisine]=download.count
            }else{

              acc[download.recipeCuisine]+download.count
            }
            return acc;
          },{})
        
        for (const cuisine in cuisineObject) {
          downloadArray.push({name:cuisine,y:cuisineObject[cuisine]})
          
        }
      localStorage.setItem("chart",JSON.stringify(downloadArray))
      
        
    })
  }
 
}



