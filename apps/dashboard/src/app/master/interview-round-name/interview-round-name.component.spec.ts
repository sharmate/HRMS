import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewRoundNameComponent } from './interview-round-name.component';

describe('InterviewRoundNameComponent', () => {
  let component: InterviewRoundNameComponent;
  let fixture: ComponentFixture<InterviewRoundNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterviewRoundNameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterviewRoundNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
