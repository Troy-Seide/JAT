import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResListingsComponent } from './res-listings.component';

describe('ResListingsComponent', () => {
  let component: ResListingsComponent;
  let fixture: ComponentFixture<ResListingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResListingsComponent]
    });
    fixture = TestBed.createComponent(ResListingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
