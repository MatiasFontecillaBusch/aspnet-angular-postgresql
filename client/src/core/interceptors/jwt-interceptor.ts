import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthenticationService } from '../services/authentication-service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  // const authenticationService = inject(AuthenticationService);
  // const token = authenticationService.token();

  // console.log({ token });

  // if (token) {
  //   req = req.clone({
  //     setHeaders: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });
  // }

  req = req.clone({
    withCredentials: true,
  });

  return next(req);
};
