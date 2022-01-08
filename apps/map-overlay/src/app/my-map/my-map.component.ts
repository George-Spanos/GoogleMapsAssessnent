import { AfterViewInit, ChangeDetectionStrategy, Component, ViewChild } from "@angular/core";
import { BehaviorSubject, Observable, share, take, tap } from "rxjs";
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
  markers$: Observable<Marker[]> = new BehaviorSubject([]);
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
    this.markers$ = this.markerService.getInitialMarkers().pipe(take(1), tap(() => {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
      this.initializeDrawing();
    }), tap(
      () => {
        this.toastr.success("Pins Rendered");
      }
    ));

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
      this.markers$ = this.markerService.createDrawingMarkers(north, south, west, east).pipe(tap(
          () => {
            this.toastr.success("Pins Rendered");
          }
        )
      )
      ;
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
        this.afterDrawing(event);
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
}
