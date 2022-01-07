import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MarkerGeneratorService } from "./marker-generator.service";

@NgModule({
  imports: [CommonModule],
  providers: [MarkerGeneratorService]
})
export class FeatureMarkersModule {
}
