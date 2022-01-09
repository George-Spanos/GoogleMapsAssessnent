import { Route, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { FirstSolutionMapComponent } from "./first-solution-map/first-solution-map.component";
import { SecondSolutionMapComponent } from "./second-solution-map/second-solution-map.component";
import { NgModule } from "@angular/core";
import { PerformanceHistoryComponent } from "./performance-history/performance-history.component";

const appRoutes: Route[] = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "first-solution",
    component: FirstSolutionMapComponent
  },
  {
    path: "second-solution",
    component: SecondSolutionMapComponent
  }, {
    path: "performance-history",
    component: PerformanceHistoryComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
