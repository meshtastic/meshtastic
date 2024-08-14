import React from "react";
import Giscus from "@giscus/react";
import { useColorMode } from "@docusaurus/theme-common";

export default function GiscusComponent() {
  const { colorMode } = useColorMode();

  return (
    <Giscus
      repo="meshtastic/meshtastic"
      repoId="MDEwOlJlcG9zaXRvcnkzMzkzMDEyMjI="
      category="Blog Post Comments"
      categoryId="DIC_kwDOFDlTZs4Choq7"
      mapping="pathname"
      term="specific-term" //If you didn't select "Discussion title contains a specific term", omit.
      strict="1"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme={colorMode}
      lang="en"
      loading="lazy"
      crossorigin="anonymous"
      async
    />
  );
}
