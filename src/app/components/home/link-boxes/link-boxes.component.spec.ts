import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkBoxesComponent } from './link-boxes.component';

describe('LinkBoxesComponent', () => {
  let component: LinkBoxesComponent;
  let fixture: ComponentFixture<LinkBoxesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinkBoxesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LinkBoxesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
