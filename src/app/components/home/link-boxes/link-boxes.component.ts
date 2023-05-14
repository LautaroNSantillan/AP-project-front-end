import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-link-boxes',
  templateUrl: './link-boxes.component.html',
  styleUrls: ['./link-boxes.component.scss']
})
export class LinkBoxesComponent {
  showElement: boolean = true;

  constructor() {
    this.updateShowElement(window.innerWidth);
  }

  @HostListener('window:resize', ['$event.target.innerWidth'])
  onResize(width: number) {
    this.updateShowElement(width);
  }

  private updateShowElement(width: number) {
    this.showElement = width >= 768; // change 768 to the minimum screen width at which you want to show the element
  }
}
