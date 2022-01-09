

# TRG Assessment

The goal of this project is to implement a map overlay for Google Maps. From my understanding, I cannot optimize the performance within 3 days of work. I have little experience working with the Google Maps Javascript API, so instead of trying to pursue performance optimization up to the last minute, I decided to devote the last of three days on code quality.

## Specs

You are requested to develop an Angular (v10+) based application that:
* is map-centric over Google Maps (get a free API key here),
* renders random geo-points (markers), on the map, inside a predefined geographic
bounding box,
* the app provides a toolbox, allowing the user to draw the bounding box
* once the bounding box is drawn, the application renders a large volume of location points
(pins),
* the number of pins is random, between 9K - 15K
* each pin is clickable. Once clicked, an info window pops-up with the coordinates, and the
timestamp the marker was generated.
* upon rendering completion, a dialog presents the following statistics
  * number of pins
  * elapsed time (start - end) of total rendering time
  * total object (pin) memory allocation

## Mindset behind coding

My goal is to break down the project as if it was a deliverable.

### Issues Faced and Solutions
There are two branches that implement the solution based on different libraries. The first library is the [@agm](https://angular-maps.com/api-docs/agm-core/components/agmmap) and the second solution is based on the [@angular/google-maps](https://www.npmjs.com/package/@angular/google-maps).

As it was expected the 9000-15000 markers are too much for a browser to render. I've done multiple steps to improve performance and there are of course much more to do:


1. At first a randomized amount of markers between 9 and 15 thousand was not even rendering. This improved by
   1. Choosing to use the [@angular/google-maps](https://www.npmjs.com/package/@angular/google-maps) library since it proved to be more performant for rendering thousands of markers due to the fact that they get rendered progressively.
   2. Making sure that every marker has its flag ["optimize" set to true](https://developers.google.com/maps/optimization-guide#optimizing_markers).
   3.  I create the markers programmatically, avoiding *ngFor loops. Event with TrackByFn they seem under-performant in relation to typescript (which translates to vanilla JavaScript).
2. After the above changes, the map renders but was still unusable and the page crashed from an "out of memory" exception.
   1. The solution that I found on the internet and seems the post popular one is to use [Marker Clustering](https://developers.google.com/maps/documentation/javascript/marker-clustering). With Marker Clustering the Angular Google Maps library (agm) seems to clearly outperform @angular/google-maps.
### Conclusion and Roadmap
Within three days, this project is far from optimal. If I were to present the efficiency and differences between the
two libraries I would first:

* Refactor each solution into its own library, including pieces of its logic all together and exposing just a module, to be loaded lazily.
* I would enrich the Performance Service and probably move it to its own library, since PerformanceMonitor is definitely a feature-library
* I would refactor reusable UI components like cards, toasts and dialogs into a shared-ui library, making them reusable.

