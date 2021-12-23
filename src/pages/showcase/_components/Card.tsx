import React from 'react';

import Image from '@theme/IdealImage';

import { Showcase } from '../../../utils/apiTypes';
import { mapUrl } from '../../../utils/map';
import { CardTags } from './CardTags';

export interface CardProps {
  network: Showcase;
}

export const Card = React.memo(({ network }: CardProps) => (
  <div className="card">
    <div className="card__image">
      <Image img={mapUrl(network.nodes ?? [])} alt={network.title} />
    </div>
    <div className="card__body">
      <h4>{network.title}</h4>
      <small>{network.summary}</small>
    </div>
    <div className="card__footer">
      <a
        href={`?id=${network.id}`}
        className="button button--primary button--block"
        style={{ marginBottom: "0.5rem" }}
      >
        Read more
      </a>
      <CardTags tags={network.tags} />
    </div>
  </div>
));
