import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FeatureMarkersModule } from "@trg-assessment/feature-markers";
import { ReactiveComponentModule } from "@ngrx/component";
import { GoogleMapsModule } from "@angular/google-maps";
import { ToastrModule } from "ngx-toastr";
import { AgmCoreModule } from "@agm/core";
import { AgmMarkerClustererModule } from "@agm/markerclusterer";
import { AgmDrawingModule } from "@agm/drawing";
import { FirstSolutionMapComponent } from "./first-solution-map/first-solution-map.component";
import { SecondSolutionMapComponent } from "./second-solution-map/second-solution-map.component";
import { HeaderComponent } from "./header/header.component";
import { HomeComponent } from "./home/home.component";
import { AppRoutingModule } from "./app.routing.module";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { PerformanceHistoryComponent } from "./performance-history/performance-history.component";
import { MatCardModule } from "@angular/material/card";

@NgModule({
  declarations: [AppComponent, FirstSolutionMapComponent, SecondSolutionMapComponent, HeaderComponent, HomeComponent, PerformanceHistoryComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GoogleMapsModule,
    BrowserAnimationsModule,
    FeatureMarkersModule,
    ToastrModule.forRoot(),
    ReactiveComponentModule,
    MatCardModule,
    AgmCoreModule.forRoot({
      libraries: ["drawing"],
      apiKey: "AIzaSyCi64X0rqx5hZMSiXnwnN7EyftWZxSddTU"
    }),
    AgmDrawingModule,
    AgmMarkerClustererModule,
    MatToolbarModule, MatIconModule, MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
