import { Injectable } from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class ScrollService {
  constructor(private router: Router) { }
  scrollToElement(elementId: string) {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
    }
  }
  onNavLinkClick(fragment: string) {
    if (this.router.url === '/') {
      // If you're on the main page, scroll to the specified fragment.
      this.scrollToElement(fragment);
    } else {
      // If you're not on the main page, navigate to the root page.
      this.router.navigate(['/']);
      this.scrollToElement(fragment);
    }
  }
}
