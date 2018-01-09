import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-custom-columns-dialog',
  templateUrl: './custom-columns-dialog.component.html',
  styleUrls: ['./custom-columns-dialog.component.css']
})
export class CustomColumnsDialogComponent implements OnInit {
  // @Input() allColumns: string [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any) {}
  ngOnInit() {
  }
}
