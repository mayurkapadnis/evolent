import { TestBed } from '@angular/core/testing';

import { App.ServiceService } from './app.service.service';

describe('App.ServiceService', () => {
  let service: App.ServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(App.ServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
