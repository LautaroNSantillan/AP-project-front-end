import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMockUsersComponent } from './edit-mock-users.component';

describe('EditMockUsersComponent', () => {
  let component: EditMockUsersComponent;
  let fixture: ComponentFixture<EditMockUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMockUsersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditMockUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
