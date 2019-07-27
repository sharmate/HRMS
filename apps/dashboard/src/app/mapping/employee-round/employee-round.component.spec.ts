import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeRoundComponent } from './employee-round.component';

describe('EmployeeRoundComponent', () => {
  let component: EmployeeRoundComponent;
  let fixture: ComponentFixture<EmployeeRoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeRoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeRoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
