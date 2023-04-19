import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEduComponent } from './create-edu.component';

describe('CreateEduComponent', () => {
  let component: CreateEduComponent;
  let fixture: ComponentFixture<CreateEduComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEduComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEduComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
