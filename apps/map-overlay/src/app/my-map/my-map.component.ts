import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { Marker } from "@trg-assessment/domain";
import { MarkerGeneratorService } from "@trg-assessment/feature-markers";
import { GoogleMap, MapInfoWindow } from "@angular/google-maps";
import { ToastrService } from "ngx-toastr";
import { extractCoordinatesFromShape } from "@trg-assessment/shared-ui";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { executeAndMeasureTimePerformance, roughSizeOfObject } from "@trg-assessment/utils";

@Component({
  selector: "trg-assessment-my-map",
  templateUrl: "./my-map.component.html",
  styleUrls: ["./my-map.component.scss"]
})
export class MyMapComponent implements AfterViewInit {
  @ViewChild("map", { static: false }) map!: GoogleMap;
  @ViewChild(MapInfoWindow, { static: false }) info!: MapInfoWindow;
  drawingManager: google.maps.drawing.DrawingManager | undefined;
  private _markers$: BehaviorSubject<Marker[]> = new BehaviorSubject<Marker[]>(this.markerService.getInitialMarkers());
  _renderedCluster: MarkerClusterer | undefined;
  markers$: Observable<Marker[]> = this._markers$.asObservable();
  lat!: number;
  long!: number;
  zoom = 7;
  center!: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    zoomControl: true,
    scrollwheel: true,
    maxZoom: 15
  };

  constructor(private markerService: MarkerGeneratorService, private toastr: ToastrService) {
  }


  public ngAfterViewInit() {
    if (this.map.googleMap) {
      // this.map.googleMap.addListener("idle", () => {
      //   alert("map is idle");
      // });
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
      this.initializeDrawingManager();
      // this.markers$ = this._markers$.pipe(tap((markers) => markers.forEach(m => this.renderMarker(m))));
      this.markers$ = this._markers$.pipe(tap((markers) => {
        const result = executeAndMeasureTimePerformance(this.renderMarkerCluster.bind(this), [markers]);
        this.toastr.info(`
      <div>Pin Count: ${this.markerService.pinCount}</div>
      <div>Time executing: ${result}</div>
      <div>Object Size: ${roughSizeOfObject(markers)}</div>
      `, "After render", { enableHtml: true });
      }));
    }

  }

  afterDrawingCompleted(rectangle: google.maps.Rectangle) {
    this.clearMarkers();
    const { north, south, east, west } = extractCoordinatesFromShape.rectangle(rectangle);
    const markers = this.markerService.createDrawingMarkers(north, south, west, east);
    this._markers$.next(markers);

  }

  //#region private methods
  private initializeDrawingManager() {
    this.drawingManager = new google.maps.drawing.DrawingManager({
      drawingMode: google.maps.drawing.OverlayType.RECTANGLE,
      drawingControl: true,
      drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_CENTER,
        drawingModes: [
          google.maps.drawing.OverlayType.RECTANGLE
        ]
      },
      polygonOptions: {
        strokeColor: "#00ff00"
      }
    });
    if (this.map?.googleMap) {
      this.drawingManager.setMap(this.map.googleMap);
      google.maps.event.addListener(this.drawingManager, "rectanglecomplete", (event: google.maps.Rectangle) => {
        this.afterDrawingCompleted(event);
      });
    }
  }

  trackByIndex(index: number) {
    return index;
  }

  // Commented out since we chose to go with Marker Clusters due to performance issues
  // private renderMarker(marker: Marker) {
  //   if (!this.map?.googleMap) throw new Error("map in not found");
  //
  //   const newMarker = marker.attachToMap(this.map.googleMap);
  //   const infoWindow = createInfoWindow(marker);
  //   addInfoEventListener(infoWindow, newMarker, this.map.googleMap);
  //   this._renderedMarkers.push(newMarker);
  //
  // }

  private clearMarkers() {
    this._renderedCluster?.clearMarkers();
  }

  private renderMarkerCluster(markers: Marker[]) {
    const newMarkers = markers.map(m => m.toGoogleMarker());
    this._renderedCluster = new MarkerClusterer({
      markers: newMarkers,
      map: this.map.googleMap
    });
  }


  //#endregion
}
