import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router=inject(Router)
  if (sessionStorage.getItem("token")&& sessionStorage.getItem("user")){
    let user=JSON.parse(sessionStorage.getItem("user")||"")
    if(user.role=="User"){
      return true
    }
    else{
      return false
    }
  }
  else{
    router.navigateByUrl('/login')
    return false
    
  }
};
