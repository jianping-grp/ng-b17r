import {Component, OnInit} from '@angular/core';
import {TargetInteraction} from '../../../../phin/models/target-interaction';
import {RestService} from '../../../../services/rest/rest.service';

@Component({
  selector: 'app-target-network',
  templateUrl: './target-network.component.html',
  styleUrls: ['./target-network.component.css']
})
export class TargetNetworkComponent implements OnInit {
  private target_id: string;
  targetInteractions: TargetInteraction[] | null;

  constructor(private rest: RestService) {
  }

  ngOnInit() {
    console.log('target network init');
  }

  networkInit() {
  }


}
