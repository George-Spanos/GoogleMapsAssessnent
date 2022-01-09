import { Component } from "@angular/core";
import { PerformanceHistoryService } from "@trg-assessment/feature-markers";

@Component({
  selector: "trg-assessment-performance-history",
  templateUrl: "./performance-history.component.html",
  styleUrls: ["./performance-history.component.scss"]
})
export class PerformanceHistoryComponent {
  history$ = this.performanceHistoryService.history$;

  constructor(private performanceHistoryService: PerformanceHistoryService) {
  }
}
