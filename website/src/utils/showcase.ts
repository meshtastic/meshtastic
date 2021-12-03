import { writeups } from '../data/networks/_overview';

export interface Material {
  name: string;
  details: string;
  image?: string;
  url?: string;
}

interface Author {
  name: string;
  about: string;
  url?: string;
  avatarUrl?: string;
}

interface BodySegment {
  heading: string;
  body: string;
}

export interface NetworkWriteup {
  summary: string;
  body: BodySegment[];
  bom: Material[];
  author: Author;
}

export type Tag = {
  label: string;
  description: string;
  color: string;
};

export type TagType =
  | "portable"
  | "offGrid"
  | "largeNetwork"
  | "longDistance"
  | "community"
  | "favorite";

export interface Node {
  latitude: number;
  longitude: number;
}

export type ShowcaseNetwork = {
  id: string; //please get id from https://www.getuniqueid.com/cuid
  title: string;
  description: string;
  nodes: Node[];
  tags: TagType[];
};

export const Tags: Record<TagType, Tag> = {
  portable: {
    label: "Portable",
    description: "Networks that move",
    color: "#560bad",
  },

  offGrid: {
    label: "Off Grid",
    description: "No mains power here",
    color: "#2a9d8f",
  },

  largeNetwork: {
    label: "Large Network",
    description: "Many users or nodes",
    color: "#2191bc",
  },

  longDistance: {
    label: "Long Distance",
    description: "Links over massive distances",
    color: "#e9c46a",
  },

  community: {
    label: "Community",
    description: "General access networks for many users",
    color: "#e76f51",
  },

  favorite: {
    label: "Favorite",
    description: "Our picks for the coolest networks",
    color: "#e9669e",
  },
};

export const sortBy = <T>(array: T[], getter: (item: T) => unknown): T[] => {
  const sortedArray = [...array];
  sortedArray.sort((a, b) =>
    getter(a) > getter(b) ? 1 : getter(b) > getter(a) ? -1 : 0
  );
  return sortedArray;
};

export const TagList = Object.keys(Tags) as TagType[];
const sortNetworks = async (): Promise<ShowcaseNetwork[]> => {
  const metadata = await Promise.all(
    writeups.map(async (id) => {
      const data = (await import(`../data/networks/${id}`)) as {
        metadata: ShowcaseNetwork;
        writeup: NetworkWriteup;
      };
      return data.metadata;
    })
  );

  let sorted = sortBy(metadata, (network) => network.title.toLowerCase());
  return (sorted = sortBy(
    sorted,
    (network) => !network.tags.includes("favorite")
  ));
  // let result = networks;

  // result = sortBy(result, (user) => user.title.toLowerCase());
  // result = sortBy(result, (user) => !user.tags.includes("favorite"));
  // return result;
};

export const sortedNetworks = sortNetworks();

export const difference = <T>(...arrays: T[][]): T[] => {
  return arrays.reduce((a, b) => a.filter((c) => !b.includes(c)));
};

export const toggleListItem = <T>(list: T[], item: T): T[] => {
  const itemIndex = list.indexOf(item);
  if (itemIndex === -1) {
    return list.concat(item);
  } else {
    const newList = [...list];
    newList.splice(itemIndex, 1);
    return newList;
  }
};
