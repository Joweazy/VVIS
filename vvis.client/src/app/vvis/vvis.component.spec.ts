import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VvisComponent } from './vvis.component';

describe('VvisComponent', () => {
  let component: VvisComponent;
  let fixture: ComponentFixture<VvisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ VvisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VvisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
