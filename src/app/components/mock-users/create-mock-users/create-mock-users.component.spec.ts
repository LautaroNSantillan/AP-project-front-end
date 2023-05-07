import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMockUsersComponent } from './create-mock-users.component';

describe('CreateMockUsersComponent', () => {
  let component: CreateMockUsersComponent;
  let fixture: ComponentFixture<CreateMockUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateMockUsersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateMockUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
