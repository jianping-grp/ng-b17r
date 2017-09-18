import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import {Component , OnInit} from '@angular/core';
import {ActivatedRoute , Router , ParamMap} from '@angular/router'

@Component({
  selector: 'app-target-list' ,
  templateUrl: './target-list.component.html' ,
  styleUrls: ['./target-list.component.css']
})
export class TargetListComponent implements OnInit {

  constructor(private router: Router ,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    console.log('target list init');
    let keyword = this.route.snapshot.paramMap.get('keyword');
    console.log(keyword);
  }

}
