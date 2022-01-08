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

export class Marker {
  position: google.maps.LatLngLiteral | google.maps.LatLng;
  label: string | google.maps.MarkerLabel;
  title: string;
  options: google.maps.MarkerOptions;

  constructor(position: google.maps.LatLngLiteral | google.maps.LatLng,
              label: string | google.maps.MarkerLabel,
              title: string,
              options: google.maps.MarkerOptions) {
    this.position = position;
    this.label = label;
    this.title = title;
    this.options = options;
  }

  toGoogleMarker(): google.maps.Marker {
    return new google.maps.Marker({
      position: this.position,
      label: this.label,
      title: this.title,
      optimized: true
    });
  }
}
