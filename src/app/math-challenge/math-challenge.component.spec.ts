import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MathChallengeComponent } from './math-challenge.component';

describe('MathChallengeComponent', () => {
  let component: MathChallengeComponent;
  let fixture: ComponentFixture<MathChallengeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MathChallengeComponent]
    });
    fixture = TestBed.createComponent(MathChallengeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
