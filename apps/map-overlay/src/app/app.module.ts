import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { AgmCoreModule } from "@agm/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FeatureMarkersModule } from "@trg-assessment/feature-markers";
import { ReactiveComponentModule } from "@ngrx/component";
import { MyMapComponent } from './my-map/my-map.component';
import { AgmDrawingModule } from "@agm/drawing";

@NgModule({
  declarations: [AppComponent, MyMapComponent],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyCi64X0rqx5hZMSiXnwnN7EyftWZxSddTU",
      libraries:['drawing']
    }),
    AgmDrawingModule,
    BrowserAnimationsModule,
    FeatureMarkersModule,
    ReactiveComponentModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
