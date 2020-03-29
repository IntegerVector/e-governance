import { Component, OnInit, Input } from '@angular/core';
import { PanelOptionsDTO } from '../shared/types/panel-options-dto';

@Component({
  selector: 'app-navigation-panel',
  templateUrl: './navigation-panel.component.html',
  styleUrls: ['./navigation-panel.component.scss']
})
export class NavigationPanelComponent implements OnInit {
  @Input() panelOptions: PanelOptionsDTO = null;

  constructor() { }

  ngOnInit(): void {
  }

}
