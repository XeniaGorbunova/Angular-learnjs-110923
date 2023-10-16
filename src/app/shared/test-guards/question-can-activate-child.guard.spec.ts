import {TestBed} from '@angular/core/testing';

import {QuestionCanActivateChildGuard} from './question-can-activate-child.guard';

describe('QuestionCanActivateChildGuard', () => {
    let guard: QuestionCanActivateChildGuard;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        guard = TestBed.inject(QuestionCanActivateChildGuard);
    });

    it('should be created', () => {
        expect(guard).toBeTruthy();
    });
});
