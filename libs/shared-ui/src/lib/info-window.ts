import { Marker } from "@trg-assessment/domain";
import InfoWindow = google.maps.InfoWindow;

export function createInfoWindow(marker: Marker): InfoWindow {
  return new google.maps.InfoWindow({
    content: `
                  <div>lat: ${marker.position.lat}</div>
                  <div>lng: ${marker.position.lng}</div>
                  <div>Timestamp: ${new Date().getTime()}</div>
                `
  });


}

export function addInfoEventListener(infoWindow: InfoWindow, marker: google.maps.Marker, map: google.maps.Map) {
  marker.addListener("click", (() => {
    infoWindow.open({
      anchor: marker,
      map: map,
      shouldFocus: false
    });
  }));
}
