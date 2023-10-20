import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SudokoComponent } from './sudoko.component';

describe('SudokoComponent', () => {
  let component: SudokoComponent;
  let fixture: ComponentFixture<SudokoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SudokoComponent]
    });
    fixture = TestBed.createComponent(SudokoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
