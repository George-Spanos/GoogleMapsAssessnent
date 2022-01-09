import { AfterViewInit, Component, OnDestroy, ViewChild } from "@angular/core";
import { BehaviorSubject, Observable, take, tap } from "rxjs";
import { Marker, PerformanceEntry } from "@trg-assessment/domain";
import { MarkerGeneratorService, PerformanceHistoryService } from "@trg-assessment/feature-markers";
import { GoogleMap, MapInfoWindow } from "@angular/google-maps";
import { ToastrService } from "ngx-toastr";
import { extractCoordinatesFromShape } from "@trg-assessment/shared-ui";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { roughSizeOfObject } from "@trg-assessment/utils";

@Component({
  selector: "trg-assessment-my-map",
  templateUrl: "./second-solution-map.component.html",
  styleUrls: ["./second-solution-map.component.scss"]
})
export class SecondSolutionMapComponent implements AfterViewInit, OnDestroy {
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
  start = 0;
  end = 0;

  constructor(private markerService: MarkerGeneratorService, private toastr: ToastrService, private performanceService: PerformanceHistoryService) {
  }


  public ngAfterViewInit() {
    if (this.map.googleMap) {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
      this.initializeDrawingManager();
      this.markers$ = this._markers$.pipe(tap((markers) => {
        this.start = performance.now();
        this.renderMarkerCluster(markers);
        if (markers.length !== this.markerService._initialNumberOfMarkers) {
          const toast = this.toastr.info(`
          <div>Pin Count: ${this.markerService.pinCount}</div>
          <div>Object Size: ${roughSizeOfObject(markers)}</div>
            `, "After render", { enableHtml: true });
          toast.onShown.pipe(take(1)).subscribe(() => {
            this.end = performance.now();
            this.printTimeSpent();
          });
        }
      }));
    }

  }

  public ngOnDestroy(): void {
    this.markerService.pinCount = 0;
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


  private clearMarkers() {
    this._renderedCluster?.clearMarkers();
  }

  private renderMarkerCluster(markers: Marker[]) {
    const newMarkers = markers.map(m => m.toGoogleMarker());
    markers.forEach((marker, index) => {
      const infoWindow = new google.maps.InfoWindow({
        content: `
           <div>Latitude: ${marker.position.lat}</div>
          <div>Longitude: ${marker.position.lng}</div>
          <div>Date Added: ${marker.dateAdded}</div>`
      });
      const googleMarker = newMarkers[index];
      googleMarker.addListener("click", () => {
        infoWindow.open({
          anchor: googleMarker,
          map: this.map.googleMap,
          shouldFocus: false
        });
      });
    });
    this._renderedCluster = new MarkerClusterer({
      markers: newMarkers,
      map: this.map.googleMap
    });
  }

  private printTimeSpent() {
    const timeRendering = ((this.end - this.start) / 1000).toFixed(2);
    const newEntry = new PerformanceEntry(
      this.markerService.pinCount,
      roughSizeOfObject(this._markers$.getValue()),
      new Date(),
      timeRendering,
      "second");
    this.performanceService.addEntry(newEntry);
    this.toastr.info(`
    <div>Time executing: ${((this.end - this.start) / 1000).toFixed(2)}</div>
    `, "Time Spent", { enableHtml: true });
  }

  //#endregion

}
