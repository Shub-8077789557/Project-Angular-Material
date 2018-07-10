import { TestBed, inject } from '@angular/core/testing';

import { SaveNewsletterService } from './save-newsletter.service';

describe('SaveNewsletterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SaveNewsletterService]
    });
  });

  it('should be created', inject([SaveNewsletterService], (service: SaveNewsletterService) => {
    expect(service).toBeTruthy();
  }));
});
