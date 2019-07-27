import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostcenterDepartmentComponent } from './costcenter-department.component';

describe('CostcenterDepartmentComponent', () => {
  let component: CostcenterDepartmentComponent;
  let fixture: ComponentFixture<CostcenterDepartmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostcenterDepartmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostcenterDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
