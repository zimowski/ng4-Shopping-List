import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalProgressbarComponent } from './total-progressbar.component';

describe('TotalProgressbarComponent', () => {
  let component: TotalProgressbarComponent;
  let fixture: ComponentFixture<TotalProgressbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalProgressbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalProgressbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
