import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Transfer } from 'src/app/models/transfer.model';

@Component({
  selector: 'app-move-list',
  templateUrl: './move-list.component.html',
  styleUrls: ['./move-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MoveListComponent implements OnInit {
  @Input() userMoves: Transfer[];
  @Input() isContactNameNeedsToRender: Boolean;
  
  constructor() { }

  ngOnInit(): void {
  }

}
