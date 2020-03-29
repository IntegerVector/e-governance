import { Component, OnInit } from '@angular/core';
import { DataSourceService } from './shared/services/data-source/data-source.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public panelOptions = null;
  constructor(private dataSourceService: DataSourceService) { }

  public ngOnInit() {
    this.dataSourceService.getPanelOptions().subscribe(observer => {
      this.panelOptions = observer;
    });
  }
}
