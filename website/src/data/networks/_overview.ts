import { ShowcaseNetwork } from '../../utils/showcase';

export const networks: ShowcaseNetwork[] = [
  {
    id: "ckwhq3l5a000008kufkw8f3dg",
    title: "Network 1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget dui mollis.",
    nodes: [
      {
        latitude: -37.656719,
        longitude: 145.632219,
      },
      {
        latitude: -37.633466,
        longitude: 145.692371,
      },
      {
        latitude: -37.559148,
        longitude: 145.735771,
      },
    ],
    tags: ["community", "largeNetwork"],
  },
  {
    id: "ckwhq4jch000108kuawlwaz0y",
    title: "Network 2",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut mattis felis.",
    nodes: [
      {
        latitude: -27.069626,
        longitude: 139.961265,
      },
      {
        latitude: -26.520932,
        longitude: 139.773739,
      },
      {
        latitude: -26.233798,
        longitude: 139.752755,
      },
    ],
    tags: ["favorite", "portable"],
  },
  {
    id: "ckwhq4skm000208ku4h8ta03q",
    title: "Network 3",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, faucibus ut.",
    nodes: [
      {
        latitude: -5.64,
        longitude: 134.749708,
      },
      {
        latitude: -5.561545,
        longitude: 134.706247,
      },
    ],
    tags: ["longDistance"],
  },
  {
    id: "ckwhq4yau000308kufwqz6pri",
    title: "Network 4",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce luctus.",
    nodes: [
      {
        latitude: 46.658126,
        longitude: 62.22795,
      },
      {
        latitude: 46.697482,
        longitude: 61.560184,
      },
    ],
    tags: ["favorite", "largeNetwork", "offGrid"],
  },
];
