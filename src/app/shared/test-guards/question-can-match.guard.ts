import {Injectable} from '@angular/core';
import {CanMatch, Route, UrlSegment, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {question} from './question';

@Injectable({
    providedIn: 'root',
})
export class QuestionCanMatchGuard implements CanMatch {
    canMatch(
        _route: Route,
        _segments: UrlSegment[],
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return question('Можно ли применить данную конфигурацию?');
    }
}
