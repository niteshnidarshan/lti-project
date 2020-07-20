import { pipe } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';

export function toResponseBody<T>() {
    return pipe(
      filter(( event: HttpEvent<T> ) => event.type === HttpEventType.Response),
      map(( res: HttpResponse<T> ) => res.body)
    );
  }