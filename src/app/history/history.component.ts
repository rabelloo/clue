import { Component, OnInit } from '@angular/core';

import { HistoryService } from './history.service';
import { Round } from './round/round';

@Component({
  selector: 'clue-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  private rounds: Round[];

  constructor(private historyService: HistoryService) { }

  ngOnInit() {
  }

  private addTurn() {

  }

  private loadRounds() {
    this.historyService.getRounds()
        .subscribe(rounds => this.rounds = rounds);
  }

}
