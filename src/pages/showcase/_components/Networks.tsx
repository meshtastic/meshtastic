import React from "react";

import { FiHeart, FiSearch } from "react-icons/fi";
import useSWR from "swr";

import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { useSelectedTags } from "@site/src/hooks/useSelectedTags";

import { useFilteredNetworks } from "../../../hooks/useFilteredNetworks";
import { Showcase } from "../../../utils/apiTypes";
import { fetcher } from "../../../utils/swr";
import { NetworkSection } from "./NetworkSection";

export const Networks = (): JSX.Element => {
  const { siteConfig } = useDocusaurusContext();

  const { data, error } = useSWR<Showcase[]>(
    `${siteConfig.customFields.API_URL}/showcase`,
    fetcher
  );

  const selectedTags = useSelectedTags();
  const filteredNetworks = useFilteredNetworks(data ?? []);

  return (
    <section className="margin-top--lg margin-bottom--xl">
      {!error ? (
        selectedTags.length === 0 ? (
          <>
            <NetworkSection
              title="Our favorites"
              icon={<FiHeart />}
              iconColor="rgb(190 24 93)"
              networks={data?.filter((network) =>
                network.tags.find((tag) => tag.label === "Favorite")
              )}
            />
            <NetworkSection title="All networks" networks={data} />
          </>
        ) : (
          <NetworkSection
            title="Results"
            icon={<FiSearch />}
            networks={filteredNetworks}
          />
        )
      ) : (
        <div>{JSON.stringify(error)}</div>
      )}
    </section>
  );
};
