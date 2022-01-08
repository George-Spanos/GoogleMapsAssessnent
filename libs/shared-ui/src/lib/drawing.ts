function extractCoordinatesFromRectangle(rectangle: google.maps.Rectangle): { north: number, south: number, east: number, west: number } {
  const bounds = rectangle.getBounds();
  if (!bounds) throw new Error("Rectangle has no bounds");
  const NE = bounds.getNorthEast();
  const SW = bounds.getSouthWest();
  const north = NE.lat();
  const east = NE.lng();
  const south = SW.lat();
  const west = SW.lng();
  return { north, south, east, west };
}

export const extractCoordinatesFromShape = {
  rectangle: extractCoordinatesFromRectangle
};
