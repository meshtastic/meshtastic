import { useColorMode } from "@docusaurus/theme-common";
import Giscus from "@giscus/react";
import React from "react";

export default function GiscusComponent() {
  const { colorMode } = useColorMode();

  return (
    <Giscus
      repo="meshtastic/discussions"
      repoId="R_kgDONDs6gA"
      category="Blog Post Comments"
      categoryId="DIC_kwDONDs6gM4Cjy3h"
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
