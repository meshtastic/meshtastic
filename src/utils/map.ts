import { Node } from './apiTypes.js';

export const mapUrl = (nodes: Node[]): string => {
  const width = 900;
  const height = 400;
  const access_token =
    'pk.eyJ1Ijoic2FjaGF3IiwiYSI6ImNrNW9meXozZjBsdW0zbHBjM2FnNnV6cmsifQ.3E4n8eFGD9ZOFo-XDVeZnQ';
  const nodeCoords = nodes.map(
    ({ latitude, longitude }) => `pin-l+67ea94(${longitude},${latitude})`,
  );

  return `https://api.mapbox.com/styles/v1/mapbox/satellite-v9/static/${nodeCoords}/auto/${width}x${height}@2x?access_token=${access_token}`;
};
