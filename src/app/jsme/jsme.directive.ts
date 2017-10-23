import {Directive, ElementRef, Input, Output, EventEmitter} from '@angular/core';
declare const JSApplet: any;
//todo unfinished
@Directive({
  selector: '[appJsme]'
})
export class JsmeDirective {
  @Output() onEditorContentChange = new EventEmitter();
  @Input() width: number = 380;
  @Input() height: number = 340;
  @Input() molString = '';
  @Input() showDemo: boolean = false;
  //Please refer to http://peter-ertl.com/jsme/JSME_2017-02-26/doc.html for JSME options
  @Input() option: string;
  smiles = '';
  applet;
  private _demoSmiles = "CC1([C@@H](N2[C@H](S1)[C@@H](C2=O)NC(=O)CC3=CC=CC=C3)C(=O)O)C"

  constructor(private el: ElementRef) { }

  readMolString(molString: String) {
    this.applet.readGenericMolecularInput(molString);
  }

  private _jsmeInit() {
    setTimeout(() =>{
      if (typeof (JSApplet) != 'undefined' && typeof (this.applet) == 'undefined') {
        this.applet = new JSApplet.JSME(
          this.el.nativeElement,
          this.width.toString() + 'px',
          this.height.toString() + 'px', {
            options: this.option
          });
        if (this.molString) {
          this.readMolString(this.molString);
        }
        // show demo structure
        else if (this.showDemo) {
          this.readMolString(this._demoSmiles);
        }
        this.applet.setAfterStructureModifiedCallback(() => {
          this.smiles = this.applet.smiles();
          //console.log('structure modified! current smiles: ' + this.smiles);

        })
      }
    }, 1000);
  }
}
