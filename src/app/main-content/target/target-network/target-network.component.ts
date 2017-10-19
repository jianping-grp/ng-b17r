import {Component, Input, OnInit} from '@angular/core';
import {RestService} from '../../../services/rest/rest.service';

@Component({
  selector: 'app-target-network',
  templateUrl: './target-network.component.html',
  styleUrls: ['./target-network.component.css']
})
export class TargetNetworkComponent implements OnInit {
  @Input() tid: string;
  constructor(private rest: RestService) { }

  ngOnInit() {
    console.log('target network init')
  }

}
