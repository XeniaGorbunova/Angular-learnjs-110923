import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable} from 'rxjs';
import {baseUrl} from './base-url.const';

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const patchedRequest = request.clone({
            url: baseUrl + request.url,
        });

        return next.handle(patchedRequest);
    }
}
