import { useColorMode } from "@docusaurus/theme-common";
import Giscus from "@giscus/react";

export default function Comments(): JSX.Element {
  const { colorMode } = useColorMode();

  return (
    <div>
      <Giscus
        id="comments"
        repo="meshtastic/discussions"
        repoId="R_kgDONDs6gA"
        category="Blog Post Comments"
        categoryId="DIC_kwDONDs6gM4Cjy3h"
        mapping="pathname"
        strict="1"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme={colorMode}
        lang="en"
        loading="lazy"
        crossorigin="anonymous"
        async={true}
      />
    </div>
  );
}
