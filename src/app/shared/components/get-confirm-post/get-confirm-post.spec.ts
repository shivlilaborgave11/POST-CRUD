import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetConfirmPost } from './get-confirm-post';

describe('GetConfirmPost', () => {
  let component: GetConfirmPost;
  let fixture: ComponentFixture<GetConfirmPost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetConfirmPost]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetConfirmPost);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
