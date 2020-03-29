import { Component, OnInit, Input } from '@angular/core';
import { PanelOptions } from '../shared/types/dto/panel-options-dto';

@Component({
  selector: 'app-navigation-panel',
  templateUrl: './navigation-panel.component.html',
  styleUrls: ['./navigation-panel.component.scss']
})
export class NavigationPanelComponent implements OnInit {
  @Input() panelOptions: PanelOptions = null;

  constructor() { }

  ngOnInit(): void {
  }

}
