import {Directive, HostListener, Input} from '@angular/core';
import {Router} from '@angular/router';

@Directive({
  selector: '[appViewPageById]'
})
export class ViewPageByIdDirective {

  @Input() idType: string;
  @Input() pageId: string | number;
  @HostListener('click') onClick() {
    switch (this.idType) {
      case 'target': this.router.navigate(['targets', +(this.pageId)]); break;
      case 'document': this.router.navigate(['documents', +(this.pageId)]); break;
      case 'assay': this.router.navigate(['assays', +(this.pageId)]); break;
      default: return;
    }
  }
  constructor(
    private router: Router
  ) { }

}
