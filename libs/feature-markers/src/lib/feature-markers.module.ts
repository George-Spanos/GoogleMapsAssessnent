import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MarkerGeneratorService } from "./marker-generator.service";
import { GoogleMapsModule } from "@angular/google-maps";
import { PerformanceHistoryService } from "./performance-history.service";

@NgModule({
  imports: [CommonModule, GoogleMapsModule],
  providers: [MarkerGeneratorService, PerformanceHistoryService]
})
export class FeatureMarkersModule {
}
