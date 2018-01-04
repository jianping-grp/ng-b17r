import { Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-compound-card',
  templateUrl: './compound-card.component.html',
  styleUrls: ['./compound-card.component.css']
})
export class CompoundCardComponent implements OnInit {
  smile:string;
  chembl_name:string;

  constructor(
    public dialogRef:MatDialogRef<CompoundCardComponent>,
    @Inject(MAT_DIALOG_DATA)public data:any
  ) { }

  ngOnInit() {
    this.smile=this.data.smile;
    this.chembl_name=this.data.chembl_name;
  }

  klose(){
    this.dialogRef.close();
  }



}
