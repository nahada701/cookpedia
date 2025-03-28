import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ProfileComponent } from './profile/profile.component';
import { SavedRecipesComponent } from './saved-recipes/saved-recipes.component';
import { ViewRecipeComponent } from './view-recipe/view-recipe.component';
import { authGuard } from './guards/auth.guard';
import { adminAuthGuard } from './guards/admin-auth.guard';

export const routes: Routes = [

    // lazyloading path first set as object
    //value of loadChildren is used to import admin module dynamically
    {path:'admin',canActivate:[adminAuthGuard],loadChildren:()=>import('./admin/admin.module').then(m=>m.AdminModule)},
    {path:'',  component:HomeComponent, title:"Home Page"},
    {path:'about',  component:AboutComponent,title:"About Page"},
    {path:'contact',  component:ContactComponent,title:"Contact Page"},
    {path:'login',  component:LoginComponent,title:"Login Page"},
    {path:'register',  component:RegisterComponent,title:"Register Page"},
    {path:'recipes',  component:RecipesComponent,title:"Recipe Page"},
    {path:'profile',canActivate:[authGuard],  component:ProfileComponent,title:"Profile Page"},
    {path:'saved/recipies',canActivate:[authGuard],  component:SavedRecipesComponent,title:"Saved Recipes Page"},
    {path:'view/recipe/:id',canActivate:[authGuard],  component:ViewRecipeComponent,title:"View Recipe Page"}



];
