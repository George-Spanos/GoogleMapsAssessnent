import "@angular/google-maps";

export interface CoordinateLimits {
  latitude: {
    max: number,
    min: number
  },
  longitude: {
    max: number,
    min: number
  }
}

export interface Marker {
  position: google.maps.LatLngLiteral | google.maps.LatLng;
  label: string | google.maps.MarkerLabel;
  title: string;
  options: google.maps.MarkerOptions;
}
