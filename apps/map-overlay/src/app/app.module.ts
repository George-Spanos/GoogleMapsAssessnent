import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FeatureMarkersModule } from "@trg-assessment/feature-markers";
import { ReactiveComponentModule } from "@ngrx/component";
import { MyMapComponent } from "./my-map/my-map.component";
import { GoogleMapsModule } from "@angular/google-maps";
import { ToastrModule } from "ngx-toastr";
import { AgmCoreModule } from "@agm/core";
import { AgmMarkerClustererModule } from "@agm/markerclusterer";
import { AgmDrawingModule } from "@agm/drawing";

@NgModule({
  declarations: [AppComponent, MyMapComponent],
  imports: [
    BrowserModule,
    GoogleMapsModule,
    BrowserAnimationsModule,
    FeatureMarkersModule,
    ToastrModule.forRoot(),
    ReactiveComponentModule,
    AgmCoreModule.forRoot({
      libraries: ["drawing"],
      apiKey: "AIzaSyCi64X0rqx5hZMSiXnwnN7EyftWZxSddTU"
    }),
    AgmDrawingModule,
    AgmMarkerClustererModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
