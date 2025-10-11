import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Top100sComponent } from './top100s.component';

describe('Top100sComponent', () => {
  let component: Top100sComponent;
  let fixture: ComponentFixture<Top100sComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Top100sComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Top100sComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
