import {Component, ElementRef} from '@angular/core';
import {ScrollService} from "../scroll.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private scrollService: ScrollService) {}

  scrollToBottom(name: string) {
    this.scrollService.scrollToElement(name);
  }
}
