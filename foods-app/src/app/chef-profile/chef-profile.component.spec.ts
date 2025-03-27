import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChefProfileComponent } from './chef-profile.component';

describe('ChefProfileComponent', () => {
  let component: ChefProfileComponent;
  let fixture: ComponentFixture<ChefProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChefProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChefProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
