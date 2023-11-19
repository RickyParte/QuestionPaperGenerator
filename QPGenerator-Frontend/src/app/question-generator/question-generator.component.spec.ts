import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionGeneratorComponent } from './question-generator.component';

describe('QuestionGeneratorComponent', () => {
  let component: QuestionGeneratorComponent;
  let fixture: ComponentFixture<QuestionGeneratorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionGeneratorComponent]
    });
    fixture = TestBed.createComponent(QuestionGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
