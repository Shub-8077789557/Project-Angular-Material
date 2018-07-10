import { TestBed, inject } from '@angular/core/testing';

import { NewsletterUpdateService } from './newsletter-update.service';

describe('NewsletterUpdateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NewsletterUpdateService]
    });
  });

  it('should be created', inject([NewsletterUpdateService], (service: NewsletterUpdateService) => {
    expect(service).toBeTruthy();
  }));
});
