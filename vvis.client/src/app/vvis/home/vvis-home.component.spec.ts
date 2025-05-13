import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VvisHomeComponent } from './vvis-home.component';

describe('VvisHomeComponent', () => {
  let component: VvisHomeComponent;
  let fixture: ComponentFixture<VvisHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [VvisHomeComponent]
    });
    fixture = TestBed.createComponent(VvisHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
