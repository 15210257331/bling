import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelComponentComponent } from './model-component.component';

describe('ModelComponentComponent', () => {
  let component: ModelComponentComponent;
  let fixture: ComponentFixture<ModelComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
