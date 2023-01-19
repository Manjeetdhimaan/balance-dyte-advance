import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NutritiousFoodsComponent } from './nutritious-foods.component';

describe('NutritiousFoodsComponent', () => {
  let component: NutritiousFoodsComponent;
  let fixture: ComponentFixture<NutritiousFoodsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NutritiousFoodsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NutritiousFoodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
