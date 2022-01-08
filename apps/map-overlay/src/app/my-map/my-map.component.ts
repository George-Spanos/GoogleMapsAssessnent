import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Marker } from "@trg-assessment/domain";
import { MarkerGeneratorService } from "@trg-assessment/feature-markers";
import { MapInfoWindow } from "@angular/google-maps";
import { ToastrService } from "ngx-toastr";
import { extractCoordinatesFromShape } from "@trg-assessment/shared-ui";
import { AgmMap } from "@agm/core";
import ControlPosition = google.maps.ControlPosition;
import { roughSizeOfObject } from "@trg-assessment/utils";

@Component({
  selector: "trg-assessment-my-map",
  templateUrl: "./my-map.component.html",
  styleUrls: ["./my-map.component.scss"]
})
export class MyMapComponent implements AfterViewInit {
  @ViewChild("map", { static: false }) map!: AgmMap;
  @ViewChild(MapInfoWindow, { static: false }) info!: MapInfoWindow;
  private _markers$: BehaviorSubject<Marker[]> = new BehaviorSubject<Marker[]>(this.markerService.getInitialMarkers());
  _renderedCluster: MarkerClusterer | undefined;
  markers$: Observable<Marker[]> = this._markers$.asObservable();
  lat!: number;
  long!: number;

  drawingControlOptions: google.maps.drawing.DrawingControlOptions = {
    drawingModes: [google.maps.drawing.OverlayType.RECTANGLE],
    position: ControlPosition.TOP_CENTER
  };

  constructor(private markerService: MarkerGeneratorService, private toastr: ToastrService) {
  }


  public ngAfterViewInit() {
    if (this.map) {
      console.log(this.map);
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.long = position.coords.longitude;
      });
      // this.markers$ = this._markers$.pipe(tap((markers) => markers.forEach(m => this.renderMarker(m))));
      // this.markers$ = this._markers$.pipe(tap((markers) => {
      //   const result = executeAndMeasureTimePerformance(this.renderMarkerCluster.bind(this), [markers]);
      //   this.toastr.info(`
      // <div>Pin Count: ${this.markerService.pinCount}</div>
      // <div>Time executing: ${result}</div>
      // <div>Object Size: ${roughSizeOfObject(markers)}</div>
      // `, "After render", { enableHtml: true });
      // }));
    }

  }

  afterDrawingCompleted(rectangle: google.maps.Rectangle) {
    const { north, south, east, west } = extractCoordinatesFromShape.rectangle(rectangle);
    const markers = this.markerService.createDrawingMarkers(north, south, west, east);
    this._markers$.next(markers);

  }

  trackByIndex(index: number) {
    return index;
  }

  afterRender() {
    this.toastr.info(`
    <div>Pin Count: ${this.markerService.pinCount}</div>
    <div>Time executing: 10</div>
    <div>Object Size: ${roughSizeOfObject(this._markers$.getValue())}</div>
  `, "After render", { enableHtml: true });
  }
}
