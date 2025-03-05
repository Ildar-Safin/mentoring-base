import { Directive, ElementRef, HostListener, Renderer2 } from "@angular/core";

@Directive({
  selector: '[shadow]',
  standalone: true
})

export class ShadowDirective {
  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {}

  @HostListener('mouseenter')
  onMouseEnter() {
    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'box-shadow',
      '0 4px 8px rgba(0, 0, 0, 0.2)'
    );

    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'transition',
      'box-shadow 0.4s ease-in-out'
    );
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'box-shadow',
      'none'
    );
  }
}
