import { TestBed, inject } from '@angular/core/testing';

import { NewsletterListingService } from './newsletter-listing.service';

describe('NewsletterListingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NewsletterListingService]
    });
  });

  it('should be created', inject([NewsletterListingService], (service: NewsletterListingService) => {
    expect(service).toBeTruthy();
  }));
});
