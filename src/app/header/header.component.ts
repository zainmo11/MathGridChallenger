import {Component} from '@angular/core';
import {ScrollService} from "../scroll.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private scrollService: ScrollService) {}

  onNavLinkClick(name:string){
    this.scrollService.onNavLinkClick(name);
  }
  scrollToBottom(name: string) {
    this.scrollService.scrollToElement(name);
  }
}
