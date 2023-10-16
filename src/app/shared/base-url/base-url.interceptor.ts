import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable} from 'rxjs';
import {baseUrl} from './base-url.const';

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        // console.log(request);

        const patchedRequest = request.clone({
            url: baseUrl + request.url,
        });

        return next.handle(patchedRequest);
    }
}

// const hostMap: Record<string, string> = {
//     'host-first': baseUrl,
//     'host-last': baseUrl,
// };

// const hostMap: Record<string, string> = {
//     'host-first': baseUrl,
//     'host-last': baseUrl,
// };

// @Injectable()
// export class BaseUrlInterceptor implements HttpInterceptor {
//     constructor() {
//         console.log('Create Interceptor');
//     }

//     intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
//         console.log(request);

//         const [hostFromUrl, ...otherSegments] = request.url.split('/');
//         const host = hostFromUrl ? `${hostMap[hostFromUrl]}/` : `${baseUrl}/`;

//         const patchedRequest = request.clone({
//             url: host + otherSegments.join('/'),
//         });

//         return next.handle(patchedRequest).pipe(tap(console.log));
//     }
// }
