import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { AgmMap } from "@agm/core";
import { Observable, Subject } from "rxjs";
import { ATHENS_COORDINATES, Marker } from "@trg-assessment/domain";
import { MarkerGeneratorService } from "@trg-assessment/feature-markers";
@Component({
  selector: "trg-assessment-my-map",
  templateUrl: "./my-map.component.html",
  styleUrls: ["./my-map.component.scss"],
  encapsulation: ViewEncapsulation.Emulated
})
export class MyMapComponent implements OnInit {
  @ViewChild("AgmMap") map!: AgmMap;
  markers$: Observable<Marker[]> = new Subject();
  lat!: number;
  long!: number;
  zoom = 7;

  managerOptions = {
    drawingControl: true,
    drawingControlOptions: {
      drawingModes: [google.maps.drawing.OverlayType.RECTANGLE]
    },
    rectangleControlOptions: {
      draggable: true,
      editable: true
    },
    drawingMode: google.maps.drawing.OverlayType.RECTANGLE
  };

  constructor(private markerService: MarkerGeneratorService) {
  }

  public ngOnInit() {
    this.markers$ = this.markerService.getInitialMarkers();
    this.lat = ATHENS_COORDINATES.latitude;
    this.long = ATHENS_COORDINATES.longitude;
  }

  afterDrawing(rectangle: google.maps.Rectangle) {

    const bounds = rectangle.getBounds();
    if (bounds) {
      const NE = bounds.getNorthEast();
      const SW = bounds.getSouthWest();
      const north = NE.lat();
      const east = NE.lng();
      const south = SW.lat();
      const west = SW.lng();
      this.markers$ = this.markerService.createDrawingMarkers(north, south, west, east);

    }

  }

  logEvent(message: string) {
    console.log(message);
  }
}
