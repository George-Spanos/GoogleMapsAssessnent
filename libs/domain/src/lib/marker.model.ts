import "@angular/google-maps";

export class Marker {
  position: google.maps.LatLngLiteral;
  label: string | google.maps.MarkerLabel;
  title: string;
  options: google.maps.MarkerOptions;
  dateAdded: number;

  constructor(position: google.maps.LatLngLiteral,
              label: string | google.maps.MarkerLabel,
              title: string,
              options: google.maps.MarkerOptions) {
    this.position = position;
    this.label = label;
    this.title = title;
    this.options = options;
    this.dateAdded = new Date().getTime();
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
