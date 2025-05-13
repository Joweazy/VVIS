import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YearlyTop100Component } from './yearly-top-100.component';

describe('YearlyTop100Component', () => {
  let component: YearlyTop100Component;
  let fixture: ComponentFixture<YearlyTop100Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [YearlyTop100Component]
    });
    fixture = TestBed.createComponent(YearlyTop100Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
