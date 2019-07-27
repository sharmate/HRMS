import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesginationQuestionComponent } from './desgination-question.component';

describe('DesginationQuestionComponent', () => {
  let component: DesginationQuestionComponent;
  let fixture: ComponentFixture<DesginationQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesginationQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesginationQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
