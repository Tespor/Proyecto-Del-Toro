import { ComponentFixture, TestBed } from '@angular/core/testing';

import TablaProductComponent from './tabla.product.component';

describe('TablaProductComponent', () => {
  let component: TablaProductComponent;
  let fixture: ComponentFixture<TablaProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablaProductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablaProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
