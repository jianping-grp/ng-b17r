import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-target-activity-graph',
  templateUrl: './target-activity-graph.component.html',
  styleUrls: ['./target-activity-graph.component.css']
})
export class TargetActivityGraphComponent implements OnInit {
  tid: number;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.parent.paramMap.subscribe(
      (params: ParamMap) => {
        this.tid = +(params.get('tid'));
      }
    );
  }
}
