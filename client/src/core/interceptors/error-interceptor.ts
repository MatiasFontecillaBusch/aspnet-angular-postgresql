import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      let extractedErrors: string[] = [];

      if (err instanceof HttpErrorResponse) {
        const errorBody = err.error;

        if (errorBody && errorBody.errors) {
          const modelStateErrors = errorBody.errors;
          for (const key in modelStateErrors) {
            if (modelStateErrors[key]) {
              if (Array.isArray(modelStateErrors[key])) {
                extractedErrors.push(...modelStateErrors[key]);
              } else {
                extractedErrors.push(modelStateErrors[key]);
              }
            }
          }
        }
        else if (errorBody && typeof errorBody.error === 'string') {
          extractedErrors.push(errorBody.error);
        }
        else {
          extractedErrors.push(
            err.error?.message || err.statusText || 'Ocurrió un error inesperado en el servidor.'
          );
        }
      }
      
      return throwError(() => extractedErrors);
    })
  );
};
