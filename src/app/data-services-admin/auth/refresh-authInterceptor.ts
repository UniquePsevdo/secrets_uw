import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Globals } from '../../globals';

@Injectable()
export class RefreshAuthInterceptor implements HttpInterceptor {
    constructor(private globals: Globals) {
    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url === `${this.globals['environment']['apiUrl']}${this.globals['environment']['refresh_endpoint']}`
    && localStorage.getItem('refresh_token')) {
            const authHeader = `Bearer ${localStorage.getItem('refresh_token')}`;
            // Clone the request to add the new header.
            const authReq = req.clone({headers: req.headers.set('Authorization', authHeader)});
            // Pass on the cloned request instead of the original request.
            return next.handle(authReq);
        }
        return next.handle(req);
    }
}
