import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MockUsersComponent } from './mock-users.component';

describe('MockUsersComponent', () => {
  let component: MockUsersComponent;
  let fixture: ComponentFixture<MockUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MockUsersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MockUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
