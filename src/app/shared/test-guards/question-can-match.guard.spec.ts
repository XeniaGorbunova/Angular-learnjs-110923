import {TestBed} from '@angular/core/testing';

import {QuestionCanMatchGuard} from './question-can-match.guard';

describe('QuestionCanMatchGuard', () => {
    let guard: QuestionCanMatchGuard;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        guard = TestBed.inject(QuestionCanMatchGuard);
    });

    it('should be created', () => {
        expect(guard).toBeTruthy();
    });
});
