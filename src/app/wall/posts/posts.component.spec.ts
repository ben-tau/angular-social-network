import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WallPostsComponent } from './posts.component';

describe('WallPublicationsComponent', () => {
  let component: WallPostsComponent;
  let fixture: ComponentFixture<WallPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WallPostsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WallPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
