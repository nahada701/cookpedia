import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DownloadListComponent } from './download-list/download-list.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RequestListComponent } from './request-list/request-list.component';
import { UserListComponent } from './user-list/user-list.component';
import { ManageRecipesComponent } from './manage-recipes/manage-recipes.component';
// each component path mentioned here
const routes: Routes = [
  {path:'', component:DashboardComponent, title:"Admin Dashboard"},
  {path:'download-list', component:DownloadListComponent, title:"Downlaod List"},
  {path:'recipe-list', component:RecipeListComponent, title:"Recipe List"},
  {path:'request-list', component:RequestListComponent, title:"Request List"},
  {path:'user-list', component:UserListComponent, title:"User List"},
  {path:'recipe/add', component:ManageRecipesComponent, title:"Add Recipe"},
  {path:'recipe/edit/:id', component:ManageRecipesComponent, title:"Edit Recipe"}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
