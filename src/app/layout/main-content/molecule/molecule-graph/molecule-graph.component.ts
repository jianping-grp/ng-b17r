import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Params} from '@angular/router';

@Component({
  selector: 'app-molecule-graph',
  templateUrl: './molecule-graph.component.html',
  styleUrls: ['./molecule-graph.component.css']
})
export class MoleculeGraphComponent implements OnInit {
  molregno: number;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.parent.paramMap.subscribe(
      (params: Params) => {
        this.molregno = +(params.params.molregno);
      }
    );

  }

}
