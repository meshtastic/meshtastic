import React from 'react';

import { Showcase } from '../utils/apiTypes.js';
import { useSelectedTags } from './useSelectedTags';

const filterNetworks = (
  showcaseNetworks: Showcase[],
  selectedTags: string[]
) => {
  if (selectedTags.length === 0) {
    return showcaseNetworks;
  }
  return showcaseNetworks.filter((showcaseNetwork) => {
    if (showcaseNetwork.tags.length === 0) {
      return false;
    }
    return selectedTags.every((queryTag) =>
      showcaseNetwork.tags.find((searchTag) => searchTag.label === queryTag)
    );
  });
};

export const useFilteredNetworks = (networks: Showcase[]) => {
  const selectedTags = useSelectedTags();
  return React.useMemo(
    () => filterNetworks(networks, selectedTags),
    [selectedTags]
  );
};
