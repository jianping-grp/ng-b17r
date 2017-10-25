import {Component, Input, OnInit} from '@angular/core';
import {RestService} from '../../services/rest/rest.service';

@Component({
  selector: 'app-target-network-container',
  templateUrl: './target-network-container.component.html',
  styleUrls: ['./target-network-container.component.css']
})
export class TargetNetworkContainerComponent implements OnInit {
  @Input() tid: number | string | null;
  constructor(private rest: RestService) {}

  ngOnInit() {
  }

  getTargetNetworkData() {

  }

}
