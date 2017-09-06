import { Component, OnInit, Input } from '@angular/core';
import { Round } from './round';

@Component({
  selector: 'clue-round',
  templateUrl: './round.component.html',
  styleUrls: ['./round.component.scss']
})
export class RoundComponent implements OnInit {

  @Input() private round: Round;

  constructor() { }

  ngOnInit() {
  }

}
