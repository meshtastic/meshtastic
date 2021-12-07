import 'url-search-params-polyfill';

import React from 'react';

import { useLocation } from '@docusaurus/router';
import Layout from '@theme/Layout';

import { Filters } from './_components/Filters';
import { Network } from './_components/Network';
import { Networks } from './_components/Networks';

const Showcase = (): JSX.Element => {
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");

  return (
    <Layout
      title="Showcase"
      description="Portfolio of projects from the Meshtastic community"
    >
      <main className="margin-vert--lg">
        {!!id ? (
          <Network id={id} />
        ) : (
          <>
            <Filters />
            <Networks />
          </>
        )}
      </main>
    </Layout>
  );
};

export default Showcase;
