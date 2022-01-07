import { Component } from "@angular/core";
import { MarkerGeneratorService } from "@trg-assessment/feature-markers";

@Component({
  selector: "trg-assessment-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {

  constructor(private markerService: MarkerGeneratorService) {
  }
}
