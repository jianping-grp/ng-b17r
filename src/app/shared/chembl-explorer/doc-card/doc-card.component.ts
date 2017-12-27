import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {RestService} from '../../../services/rest/rest.service';
import {Doc} from '../../../chembl/models/doc';
import {Router} from '@angular/router';

@Component({
  selector: 'app-doc-card',
  templateUrl: './doc-card.component.html',
  styleUrls: ['./doc-card.component.css']
})
export class DocCardComponent implements OnInit {
  doc: Doc | null;
  constructor(
    public  dialogRef: MatDialogRef<DocCardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private rest: RestService,
    private router: Router
  ) { }

  ngOnInit() {
    this.rest.getDocById(this.data.docId)
      .subscribe(data => {
        this.doc = data;
      });
  }

  viewDocDetail(): void {
    this.dialogRef.close();
    this.router.navigate(['documents', +(this.doc.doc_id)]);

  }

}
