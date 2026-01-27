import { EscapeKeyHandler } from "@/components/EscapeKeyHandler";
import { SocialSidebar } from "@/components/homepage/social-sidebar";
import OriginalLayout from "@theme-original/Layout";
import type { Props } from "@theme/Layout";
import type React from "react";

export default function Layout(props: Props): React.ReactElement {
  return (
    <OriginalLayout {...props}>
      <EscapeKeyHandler />
      {props.children}
      <SocialSidebar variant="mobile" />
    </OriginalLayout>
  );
}
