import React from 'react';

import { ShowcaseNetwork, sortedNetworks, TagType } from '../utils/showcase';
import { useSelectedTags } from './useSelectedTags';

const filterNetworks = (
  showcaseNetworks: ShowcaseNetwork[],
  selectedTags: TagType[]
) => {
  if (selectedTags.length === 0) {
    return showcaseNetworks;
  }
  return showcaseNetworks.filter((showcaseNetwork) => {
    if (showcaseNetwork.tags.length === 0) {
      return false;
    }
    return selectedTags.every((tag) => showcaseNetwork.tags.includes(tag));
  });
};

export const useFilteredNetworks = () => {
  const selectedTags = useSelectedTags();
  return React.useMemo(
    () => filterNetworks(sortedNetworks, selectedTags),
    [selectedTags]
  );
};
