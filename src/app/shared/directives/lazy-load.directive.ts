import { Directive, ElementRef, HostBinding, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appLazyLoad]',
  standalone: true
})
export class LazyLoadDirective implements OnInit {
  @HostBinding('attr.src') srcAttr: string | null = null;
  @Input() appLazyLoad: string = '';

  constructor(private el: ElementRef) {}

  ngOnInit() {
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.loadImage();
            observer.unobserve(this.el.nativeElement);
          }
        });
      });
      observer.observe(this.el.nativeElement);
    } else {
      this.loadImage();
    }
  }

  private loadImage() {
    this.srcAttr = this.appLazyLoad;
  }
}
