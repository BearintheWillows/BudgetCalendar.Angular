import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayCardItemComponent } from './day-card-item.component';

describe('DayCardItemComponent', () => {
  let component: DayCardItemComponent;
  let fixture: ComponentFixture<DayCardItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ DayCardItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DayCardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
