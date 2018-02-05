import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoSnapComponent } from './photo-snap.component';

describe('PhotoSnapComponent', () => {
  let component: PhotoSnapComponent;
  let fixture: ComponentFixture<PhotoSnapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotoSnapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoSnapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
