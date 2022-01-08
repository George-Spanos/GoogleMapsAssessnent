import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FeatureMarkersModule } from "@trg-assessment/feature-markers";
import { ReactiveComponentModule } from "@ngrx/component";
import { MyMapComponent } from "./my-map/my-map.component";
import { GoogleMapsModule } from "@angular/google-maps";

@NgModule({
  declarations: [AppComponent, MyMapComponent],
  imports: [
    BrowserModule,
    GoogleMapsModule,
    BrowserAnimationsModule,
    FeatureMarkersModule,
    ReactiveComponentModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
