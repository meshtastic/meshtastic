import Layout from "@theme/Layout";
import type React from "react";

export interface PageLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export const PageLayout = ({
  title,
  description,
  children,
}: PageLayoutProps) => {
  return (
    <Layout title={title} description={description}>
      {children}
    </Layout>
  );
};

export interface ColorModeProps {
  children: React.ReactNode;
}
