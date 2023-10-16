import {Injectable} from '@angular/core';
import {CanLoad, Route, UrlSegment, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {question} from './question';

@Injectable({
    providedIn: 'root',
})
export class QuestionCanLoadGuard implements CanLoad {
    canLoad(
        _route: Route,
        _segments: UrlSegment[],
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return question('Можно ли загрузить данный модуль?');
    }
}
