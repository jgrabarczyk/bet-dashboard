import { Component, Input, OnInit } from '@angular/core';
import { Bet } from 'src/models/bet';

@Component({
  selector: 'bd-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() data: Bet[];
  displayedColumns: string[] = ['team1', 'win1', 'draw', 'win2', 'team2'];

  ngOnInit(): void {
  }

}
