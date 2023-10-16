import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {question} from './question';

@Injectable({
    providedIn: 'root',
})
export class QuestionCanDiactivateGuard implements CanDeactivate<unknown> {
    canDeactivate(
        _component: unknown,
        _currentRoute: ActivatedRouteSnapshot,
        _currentState: RouterStateSnapshot,
        _nextState?: RouterStateSnapshot,
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return question('Можно ли покинуть страницу?');
    }
}
