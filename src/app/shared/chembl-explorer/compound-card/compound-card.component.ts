import { Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {Router} from "@angular/router";

@Component({
  selector: 'app-compound-card',
  templateUrl: './compound-card.component.html',
  styleUrls: ['./compound-card.component.css']
})
export class CompoundCardComponent implements OnInit {
  smile:string;
  chembl_name:string;
  molregno: number;

  constructor(private router: Router,
    public dialogRef:MatDialogRef<CompoundCardComponent>,
    @Inject(MAT_DIALOG_DATA)public data:any
  ) { }

  ngOnInit() {
    this.smile=this.data.smile;
    this.chembl_name=this.data.chembl_name;
    this.molregno = this.data.molregno;
    console.log('molergno', this.data.molregno);
  };

  // todo delete, used for testing
  goMoleculeDetail() {
    this.router.navigate(['molecules', this.molregno]);
  }

  klose(){
    this.dialogRef.close();
  }



}
