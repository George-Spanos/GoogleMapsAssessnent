import { Component, OnInit, ViewChild } from "@angular/core";
import { AgmMap } from "@agm/core";
import { MarkerGeneratorService } from "@trg-assessment/feature-markers";
import { ATHENS_COORDINATES, Marker } from "@trg-assessment/domain";
import { Observable, Subject } from "rxjs";

@Component({
  selector: "trg-assessment-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  @ViewChild("AgmMap") map!: AgmMap;
  markers$: Observable<Marker[]>= new Subject();
  lat!: number;
  long!: number;

  constructor(private markerService: MarkerGeneratorService) {
  }

  public ngOnInit() {
    this.markers$ = this.markerService.getInitialMarkers();
    this.lat = ATHENS_COORDINATES.latitude;
    this.long = ATHENS_COORDINATES.longitude;
  }
}
