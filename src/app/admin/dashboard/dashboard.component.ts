import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import * as Highcharts from 'highcharts';
import { enableDebugTools } from '@angular/platform-browser';
import { color } from 'highcharts/highcharts.src';
import { Route, Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

      isSidebarOpen:boolean=true

      colWidth:string="col-lg-8 pe-0 m-0"

      userCount:Number=0
      recipeCount:Number=0
      downloadCount:Number=0
      feedbackCount:Number=0
      selected:Date=new Date()
      data:any=[]
      Highcharts: typeof Highcharts = Highcharts;
      chartOptions = {};

      constructor(private api:ApiService,private router:Router){
        if(localStorage.getItem("chart")){
          let chartData=JSON.parse(localStorage.getItem("chart")|| " ")
       
        
        this.chartOptions={
            chart:{
              type:'bar'  
            },
            title:{
              text:"Analysis of Download Recipes Based on Cuisine",
              align:"left"
            },
            xAxis:{
              type:"category"
            },
            yAxis:{
              type:"Total Download Recipe Count"
            },
            credits:{
              enabled:false
            },
            series:[{
              name:"Cuisine",
              colorByPoint:true,
              type:"bar",
              data:chartData

            }]
          
        }
      }
      }

      ngOnInit(){
        this.getUserCount()
        this.getRecipeCount()
        this.getDownloadCount()
        this.getNewFeedbacks()
      
      }

      menuClick(){
        this.isSidebarOpen=!this.isSidebarOpen
        this.colWidth="col m-0 pe-0"
      }
      

      getUserCount(){
        this.api.getUserListApi().subscribe((res:any)=>{
          this.userCount=res.length
        })
      }
      getRecipeCount(){
        this.api.getAllRecipeApi().subscribe((res:any)=>{
          this.recipeCount=res.length
        })
      }
      getDownloadCount(){
        this.api.getAlldownlaodRecipeApi().subscribe((res:any)=>{
          this.downloadCount=res.reduce((acc:number,downloads:any)=>acc+downloads.count,0)
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
      console.log(downloadArray);
      
        
          

        })
      }
      getNewFeedbacks(){
        this.api.getAllTestimonialsApi().subscribe((res:any)=>{
          this.feedbackCount=res.filter((feed:any)=>feed.status=="pending").length
          
        })
      }

      adminLogout(){
        sessionStorage.clear()
        this.router.navigateByUrl("/")
      }
}
