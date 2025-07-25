
import * as L from "leaflet";

declare module "leaflet" {
  namespace Routing {
    function control(options: any): any;
  }

  namespace Routing {
    interface ILineOptions {
      styles?: Array<{ color?: string; weight?: number }>;
      addWaypoints?: boolean;
      extendToWaypoints?: boolean;
      missingRouteTolerance?: number;
    }

    interface IRoutingControlOptions {
      waypoints?: L.LatLng[];
      lineOptions?: ILineOptions;
      show?: boolean;
      addWaypoints?: boolean;
      routeWhileDragging?: boolean;
    }

    function control(options: IRoutingControlOptions): L.Control;
  }
}
