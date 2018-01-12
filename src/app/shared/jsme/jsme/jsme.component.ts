import {
  AfterViewInit, Component, EventEmitter, Input, NgZone, OnChanges, OnDestroy, OnInit,
  Output, SimpleChanges
} from '@angular/core';
import {GlobalService} from '../../../services/global/global.service';

declare const JSApplet: any;

@Component({
  selector: 'app-jsme',
  templateUrl: './jsme.component.html',
  styleUrls: ['./jsme.component.css']
})
export class JsmeComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() elementId: string;
  @Output() onEditorContentChange = new EventEmitter();
  @Input() width = 380;
  @Input() height = 340;
  @Input() molString = '';
  @Input() showDemo = false;
  // Please refer to http://peter-ertl.com/jsme/JSME_2017-02-26/doc.html for JSME options
  @Input() option: string;
  smiles = '';
  applet;
  private _demoSmiles = 'CC1([C@@H](N2[C@H](S1)[C@@H](C2=O)NC(=O)CC3=CC=CC=C3)C(=O)O)C';

  constructor(private zone: NgZone, private globalService: GlobalService) {
  }

  ngOnInit() {
    // console.log('jsme widget init');
  }

  readMolString(molString: String) {
    this.applet.readGenericMolecularInput(molString);
  }
  ngOnChanges(changes: SimpleChanges) {
    if (typeof (this.applet) !== 'undefined') {
      if (changes.hasOwnProperty('molString')) {
        this.applet.readGenericMolecularInput(this.molString);
      }
    }
  }
  ngAfterViewInit() {
    if (typeof (JSApplet) !== 'undefined') {
      this.applet = new JSApplet.JSME(
        this.elementId,
        this.width.toString() + 'px',
        this.height.toString() + 'px', {
          options: this.option
        });
      if (this.molString) {
        this.readMolString(this.molString);
      } else if (this.showDemo) {
        this.readMolString(this._demoSmiles);
      }
      this.applet.setAfterStructureModifiedCallback(() => {
        this.smiles = this.applet.smiles();
      });
    } else {
      this.globalService.JSMEApplet$.subscribe(jsmeApplet => {
        this.applet = new jsmeApplet.JSME(
          this.elementId,
          this.width.toString() + 'px',
          this.height.toString() + 'px', {
            options: this.option
          });
        if (this.molString) {
          this.readMolString(this.molString);
        } else if (this.showDemo) {
          this.readMolString(this._demoSmiles);
        }
        this.applet.setAfterStructureModifiedCallback(() => {
          this.smiles = this.applet.smiles();
        });
      });
    }
  }
}

