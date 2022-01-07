import { Injectable } from "@angular/core";
import { COORDINATE_BOUNDARIES, Marker } from "@trg-assessment/domain";
import { getRandomArbitrary } from "@trg-assessment/utils";
import { Observable, of } from "rxjs";

@Injectable()
export class MarkerGeneratorService {
  private _initialNumberOfMarkers = 10;

  public getInitialMarkers(): Observable<Marker[]> {
    return this.createMarkers(this._initialNumberOfMarkers);
  }

  private createMarkers(count: number, limits = COORDINATE_BOUNDARIES): Observable<Marker[]> {

    // Since we for strict linting on the whole project, the compiler should stop any "count" that is not a number
    // so can skip the error check below
    // if(typeof count !== 'number') throw new Error('Count should always be a number');

    const markers: Marker[] = [];

    for (let i = 0; i < count; i++) {
      const latitude = getRandomArbitrary(limits.latitude.min, limits.latitude.max);
      const longitude = getRandomArbitrary(limits.longitude.min, limits.longitude.max);
      console.log(latitude, longitude);
      markers.push({
        latitude,
        longitude
      });
    }
    return of(markers);
  }
}
