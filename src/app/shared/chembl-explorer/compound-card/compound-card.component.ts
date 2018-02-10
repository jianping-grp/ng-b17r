import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Router} from '@angular/router';
import {MoleculeDictionary} from '../../../chembl/models/molecule-dictionary';
import {RestService} from '../../../services/rest/rest.service';

@Component({
  selector: 'app-compound-card',
  templateUrl: './compound-card.component.html',
  styleUrls: ['./compound-card.component.css']
})
export class CompoundCardComponent implements OnInit {
  moleculeDictionary: MoleculeDictionary;

  constructor(private router: Router,
              private rest: RestService,
              public dialogRef: MatDialogRef<CompoundCardComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    // console.log('molergno', this.data.molregno);
    this.rest.getData(
      `chembl/molecule-dictionaries/${this.data.molregno}` +
      '?include[]=compoundstructures.'
    )
      .subscribe(data => {
        this.moleculeDictionary = data['molecule_dictionary'];
      });
  }

  // todo delete, used for testing
  // goMoleculeDetail() {
  //   this.router.navigate(['molecules', this.molregno]);
  // }

  klose() {
    this.dialogRef.close();
  }


}
