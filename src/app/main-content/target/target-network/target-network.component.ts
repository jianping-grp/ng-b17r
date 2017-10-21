import {Component, Input, OnInit} from '@angular/core';
import {RestService} from '../../../services/rest/rest.service';
import {TargetInteraction} from '../../../models/phin/target-interaction';

@Component({
  selector: 'app-target-network',
  templateUrl: './target-network.component.html',
  styleUrls: ['./target-network.component.css']
})
export class TargetNetworkComponent implements OnInit {
  @Input() target_id: string;
  targetInteractions: TargetInteraction[] | null;
  constructor(private rest: RestService) { }

  ngOnInit() {
    console.log('target network init')
    this.getInteractionData();
  }

  private getInteractionData(){
    this.rest.getData(`phin/target-network/${this.target_id}`)
      .subscribe(
        data => {
          this.targetInteractions = data
        }
      )
  }

}
