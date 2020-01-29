import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[jhiColor]'
})
export class ColorDirective {
  constructor(private eleRef: ElementRef) {
    if (eleRef) {
      eleRef.nativeElement.style.background = 'blue';
    }
  }
}
