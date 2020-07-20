import { tap } from 'rxjs/operators';
import { HttpEventType, HttpEvent } from '@angular/common/http';

export function uploadProgress<T>( cb: ( progress: number ) => void ) {
    return tap(( event: HttpEvent<T> ) => {
      if ( event.type === HttpEventType.UploadProgress ) {
        cb(Math.round((100 * event.loaded) / event.total));
      }
    });
  }