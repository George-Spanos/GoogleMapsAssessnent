export interface CoordinateLimits {
  latitude: {
    max: number,
    min: number
  },
  longitude: {
    max: number,
    min: number
  }
}

export interface Marker {
  latitude: number;
  longitude: number;
}
