import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MarkerGeneratorService } from "./marker-generator.service";
import { GoogleMapsModule } from "@angular/google-maps";

@NgModule({
  imports: [CommonModule, GoogleMapsModule],
  providers: [MarkerGeneratorService]
})
export class FeatureMarkersModule {
}
