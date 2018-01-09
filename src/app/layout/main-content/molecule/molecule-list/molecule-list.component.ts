import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-molecule-list',
  templateUrl: './molecule-list.component.html',
  styleUrls: ['./molecule-list.component.css']
})
export class MoleculeListComponent implements OnInit {

<<<<<<< Updated upstream
  constructor() { }

  ngOnInit() {
=======
  displayedColumns = [
    'molregno', 'pref_name', 'molecule_type', 'max_phase', 'activities_count'
  ];
  extraParam = '';
  tableTitle = '';
  restUrl$: Observable<string>;

  constructor(private router: Router,
              private rest: RestService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    console.log('molecule list init');
    this.restUrl$ = this._getRestUrl();
  } // end of ngOnInit

  private _getRestUrl(): Observable<string> {
    return this.route.queryParamMap.map(
      (params: ParamMap) => {
        // retrieve target list by keyword
        if (params.has('keyword')) {
          const keyword = params.get('keyword');
          this.tableTitle = `Molecules searched by keyword: "${keyword}"`;
          if (keyword.toUpperCase().startsWith('CHEMBL')) {
            return `chembl/molecule-dictionaries/?filter{chembl}=${keyword.toUpperCase()}${this.extraParam}`;
          } else {
            return `chembl/molecule-dictionaries/?filter{pref_name.icontains}=${keyword}${this.extraParam}`;
          }
        }
      }
    );
>>>>>>> Stashed changes
  }

}
