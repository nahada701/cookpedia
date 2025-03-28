import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import { ApiService } from '../services/api.service';
@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FooterComponent,HeaderComponent,ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {


  testimonyForm:FormGroup

  constructor(private fb:FormBuilder,private api:ApiService){
    this.testimonyForm=this.fb.group({
      name:['',[Validators.required,Validators.pattern("[a-zA-Z ]*")]],
      email:['',[Validators.required,Validators.email]],
      message:['',[Validators.required]]

    })
  }

  addTesimony(){
    if(this.testimonyForm.valid){
      const name=this.testimonyForm.value.name
      const email=this.testimonyForm.value.email
      const message=this.testimonyForm.value.message
      console.log(email,name,message);
      
      this.api.addTesitmonyApi({name,email,message}).subscribe((res:any)=>{
        console.log(res);
        
        alert("Thankyou for your vauable thoughts")
        this.testimonyForm.reset()
      })
    }else{
      alert("invalid form")
    }
  }
}
