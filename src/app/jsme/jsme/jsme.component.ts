import {AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-jsme',
  templateUrl: './jsme.component.html',
  styleUrls: ['./jsme.component.css']
})
export class JsmeComponent implements OnInit {
  @Input() elementId: string;
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
  constructor() { }

  ngOnInit() {
    console.debug('jsme widget init');
  }
   readMolString(molString: String){
    this.applet.readGenericMolecularInput(molString);
  }
  ngAfterViewInit() {
    console.log('JSME init...');
    setTimeout(() =>{
      console.log(typeof (JSApplet))
      if (typeof (JSApplet) != 'undefined' && typeof (this.applet) == 'undefined') {
        this.applet = new JSApplet.JSME(
          this.elementId,
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
          console.log('structure modified! current smiles: ' + this.smiles);

        })
      }
    }, 1000)

  }


}
