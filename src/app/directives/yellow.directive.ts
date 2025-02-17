import {Directive, HostBinding, HostListener} from "@angular/core";

@Directive({
  selector: '[yellow]',
  standalone: true,
})

export class YellowDirective {
  color = '';

  @HostBinding('style.backgroundColor')
  get backgroundColor() {
    return this.color;
  }

  @HostListener('mouseenter')
  enter() {
    this.color = '#FFD700';
  }

  @HostListener('mouseleave')
  leave() {
    this.color = '';
  }
}
