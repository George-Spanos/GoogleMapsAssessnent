import { Injectable } from "@angular/core";
import { COORDINATE_BOUNDARIES, Marker } from "@trg-assessment/domain";
import { getRandomArbitrary, getRandomInt } from "@trg-assessment/utils";
import { Observable, of } from "rxjs";

@Injectable()
export class MarkerGeneratorService {
  private _initialNumberOfMarkers = 10;
  private _minMarkersAfterDrawing = 9000;
  private _maxMarkersAfterDrawing = 15000;

  public getInitialMarkers(): Observable<Marker[]> {
    return this.createMarkers(this._initialNumberOfMarkers);
  }

  public createDrawingMarkers(north: number, south: number, west: number, east: number): Observable<Marker[]> {
    const markerCount = getRandomInt(this._minMarkersAfterDrawing, this._maxMarkersAfterDrawing);
    return this.createMarkers(markerCount, {
      latitude: {
        max: north,
        min: south
      },
      longitude: {
        max: east,
        min: west
      }
    });
  }

  private createMarkers(count: number, limits = COORDINATE_BOUNDARIES): Observable<Marker[]> {

    // Since we for strict linting on the whole project, the compiler should stop any "count" that is not a number
    // so can skip the error check below
    // if(typeof count !== 'number') throw new Error('Count should always be a number');

    const markers: Marker[] = [];

    for (let i = 0; i < count; i++) {
      const lat = getRandomArbitrary(limits.latitude.min, limits.latitude.max);
      const lng = getRandomArbitrary(limits.longitude.min, limits.longitude.max);
      markers.push({
        position: {
          lat,
          lng
        },
        label: (i + 1).toString(),
        title: i.toString() + new Date().toDateString(),
        options: {}
      });
    }
    return of(markers);
  }
}
