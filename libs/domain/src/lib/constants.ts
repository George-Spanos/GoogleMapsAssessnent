import { CoordinateLimits } from "./coordinate-limits.model";

export const COORDINATE_BOUNDARIES: CoordinateLimits = {
  latitude: {
    max: 40,
    min: 38
  },
  longitude: {
    max: 23,
    min: 21
  }
};

export const ATHENS_COORDINATES = {
  latitude: 39.0742,
  longitude: 21.8243
} as const;
