import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrl: './request-list.component.css'
})
export class RequestListComponent {

  allTestimonias:any=[]
  constructor(private api:ApiService){}

  ngOnInit(){
    this.getAllTestimonials()
  }

  getAllTestimonials(){
    this.api.getAllTestimonialsApi().subscribe((res:any)=>{
      this.allTestimonias=res
      
    })
   }

   editTestimonialStatus(feedbackId:string,status:string){
    this.api.editTestimonialStatussApi(feedbackId,status).subscribe((res:any)=>{

      this.getAllTestimonials()
    })

  }
}
