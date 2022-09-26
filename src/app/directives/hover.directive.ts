import { Directive, ElementRef, HostListener, Input } from "@angular/core";

/**
 * Create custom hover for bet's table.
 * add bd-hover class to every element from bdHoverTarget while hovering over element
 */
@Directive({
  selector: '[bd-hover]',
})
export class HoverDirective {
  @Input() bdHoverTarget: string;
  elements: NodeListOf<Element>

  constructor(private el: ElementRef) {
  }

  ngOnInit() {
    this.initializeElements()
  }

  @HostListener('touchstart')
  onTouchStart() {
    this.addHoverClass()
  }

  @HostListener('mouseover')
  onMouseOver() {
    this.addHoverClass()
  }

  @HostListener('touchend')
  onTouchEnd() {
    this.removeHoverClass()
  }

  @HostListener('mouseout')
  onMouseOut() {
    this.removeHoverClass()
  }

  private initializeElements() {
    this.elements = (this.el.nativeElement as HTMLElement)
      .parentElement
      .querySelectorAll(`.${this.bdHoverTarget}`)
  }

  private addHoverClass() {
    this.elements.forEach(element => {
      element.classList.add('bd-hover')
    });
  }

  private removeHoverClass() {
    this.elements.forEach(element => {
      element.classList.remove('bd-hover')
    });
  }
}