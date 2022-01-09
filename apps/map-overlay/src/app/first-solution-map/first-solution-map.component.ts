import { Component, ViewChild, ViewEncapsulation } from "@angular/core";
import { AgmMap } from "@agm/core";
import { MapInfoWindow } from "@angular/google-maps";
import { BehaviorSubject, Observable, take } from "rxjs";
import { Marker } from "@trg-assessment/domain";
import { MarkerGeneratorService } from "@trg-assessment/feature-markers";
import { ToastrService } from "ngx-toastr";
import { extractCoordinatesFromShape } from "@trg-assessment/shared-ui";
import { roughSizeOfObject } from "@trg-assessment/utils";
import ControlPosition = google.maps.ControlPosition;

@Component({
  selector: "trg-assessment-first-solution-map",
  templateUrl: "./first-solution-map.component.html",
  styleUrls: ["./first-solution-map.component.scss"],
  encapsulation: ViewEncapsulation.Emulated
})
export class FirstSolutionMapComponent {

  @ViewChild("map", { static: false }) map!: AgmMap;
  @ViewChild(MapInfoWindow, { static: false }) info!: MapInfoWindow;
  private _markers$: BehaviorSubject<Marker[]> = new BehaviorSubject<Marker[]>(this.markerService.getInitialMarkers());
  markers$: Observable<Marker[]> = this._markers$.asObservable();
  lat!: number;
  long!: number;
  start = 0;
  end = 0;
  drawingControlOptions: google.maps.drawing.DrawingControlOptions = {
    drawingModes: [google.maps.drawing.OverlayType.RECTANGLE],
    position: ControlPosition.TOP_CENTER
  };

  constructor(private markerService: MarkerGeneratorService, private toastr: ToastrService) {
    navigator.geolocation.getCurrentPosition(position => {
      this.lat = position.coords.latitude;
      this.long = position.coords.longitude;
    });
  }

  afterDrawingCompleted(rectangle: google.maps.Rectangle) {
    this.start = performance.now();
    const { north, south, east, west } = extractCoordinatesFromShape.rectangle(rectangle);
    const markers = this.markerService.createDrawingMarkers(north, south, west, east);
    this._markers$.next(markers);
    this.afterRender();
  }

  trackByIndex(index: number) {
    return index;
  }

  afterRender() {
    const toast = this.toastr.info(`
    <div>Pin Count: ${this.markerService.pinCount}</div>
    <div>Object Size: ${roughSizeOfObject(this._markers$.getValue())}</div>
  `, "After render", { enableHtml: true });
    toast.onShown.pipe(take(1)).subscribe(() => {
      this.end = performance.now();
      this.printTimeSpent();
    });
  }

  printTimeSpent() {
    this.toastr.info(`
    <div>Time spent: ${((this.end - this.start) / 1000).toFixed(2)} seconds</div>
    `, "Time Spent", { enableHtml: true });
  }

}
