import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-download-list',
  templateUrl: './download-list.component.html',
  styleUrl: './download-list.component.css'
})
export class DownloadListComponent {

  allDownalodList:any=[]

  constructor(private api:ApiService){}

  ngOnInit(){
    this.getAllDownloads()
  }

    getAllDownloads(){
      this.api.getAlldownlaodRecipeApi().subscribe((res:any)=>{
        this.allDownalodList=res
        console.log(res);
        

        
      })
    }

}
