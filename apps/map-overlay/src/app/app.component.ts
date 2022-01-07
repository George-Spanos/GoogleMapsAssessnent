import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { AgmMap } from "@agm/core";

@Component({
  selector: 'trg-assessment-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  @ViewChild('AgmMap') map!: AgmMap;
  title = 'My first AGM project';
  lat = 51.678418;
  lng = 7.809007;

  public ngAfterViewInit() {

    this.map.mapReady.subscribe((map: AgmMap) => {
    });
  }
}
