import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SudokoProblemComponent } from './sudoko-problem.component';

describe('SudokoProblemComponent', () => {
  let component: SudokoProblemComponent;
  let fixture: ComponentFixture<SudokoProblemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SudokoProblemComponent]
    });
    fixture = TestBed.createComponent(SudokoProblemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
