import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { Marker } from "@trg-assessment/domain";
import { MarkerGeneratorService } from "@trg-assessment/feature-markers";
import { GoogleMap, MapInfoWindow, MapMarker } from "@angular/google-maps";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "trg-assessment-my-map",
  templateUrl: "./my-map.component.html",
  styleUrls: ["./my-map.component.scss"]
})
export class MyMapComponent implements AfterViewInit {
  @ViewChild("map") map!: GoogleMap;
  @ViewChild(MapInfoWindow, { static: false }) info!: MapInfoWindow;
  infoContent = "";
  drawingManager: google.maps.drawing.DrawingManager | undefined;
  private _markers$: BehaviorSubject<Marker[]> = new BehaviorSubject<Marker[]>(this.markerService.getInitialMarkers());
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
    let k = 0;
    navigator.geolocation.getCurrentPosition(position => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
    });
    this.initializeDrawing();
    this.markers$ = this._markers$.pipe(tap((markers) => markers.forEach(m => this.renderMarker(m))));
    this.map.googleMap?.addListener('change',() => {
      console.log("map changed", k)
      k++;
    })
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
      this._markers$.next(this.markerService.createDrawingMarkers(north, south, west, east));
    }

  }

  logEvent(message: string) {
    console.log(message);
  }

  private initializeDrawing() {
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
        const startTime = performance.now();
        this.afterDrawing(event);
        const endTime = performance.now();
        console.log(endTime - startTime);
        // Console Memory is not on the official api
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        console.log(console.memory);
      });
    }
  }

  openInfo(marker: unknown, content: unknown) {
    this.infoContent = content as string;
    this.info.open(<MapMarker>marker);
  }

  trackByIndex(index: number, item: any) {
    return index;
  }

  private renderMarker(marker: Marker) {
    const newMarker = new google.maps.Marker({
      position: marker.position,
      map: this.map.googleMap,
      label: marker.label,
      title: marker.title,
      optimized: true
    });
    const infoWindow = new google.maps.InfoWindow({
      content: new Date().getTime() + " " + marker.label
    });
    newMarker.addListener("click", (() => {
      infoWindow.open({
        anchor: newMarker,
        map: this.map.googleMap,
        shouldFocus: false
      });
    }));
  }
}
