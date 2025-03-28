import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminAuthGuard: CanActivateFn = ( ) => {
  const router=inject(Router)
  if (sessionStorage.getItem("user")){
    let user=JSON.parse(sessionStorage.getItem("user") ||"")
    if(user.role=="Admin"){

      return true
    }
    else{
      console.log("inside admin");
      
      return false
    }
  }
  else{
    console.log("outside admin");

    router.navigateByUrl('/login')
    return false
    
  }
   }

