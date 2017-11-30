import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-mmp',
  templateUrl: './mmp.component.html',
  styleUrls: ['./mmp.component.css']
})
export class MmpComponent implements OnInit {

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.parent.paramMap.subscribe(
      (paramMap: ParamMap) => {
        let tid = paramMap.get('tid')
      }
    )
  }

}
