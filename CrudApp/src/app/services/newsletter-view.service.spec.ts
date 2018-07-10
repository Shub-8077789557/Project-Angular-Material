import { TestBed, inject } from '@angular/core/testing';

import { NewsletterViewService } from './newsletter-view.service';

describe('NewsletterViewService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NewsletterViewService]
    });
  });

  it('should be created', inject([NewsletterViewService], (service: NewsletterViewService) => {
    expect(service).toBeTruthy();
  }));
});
