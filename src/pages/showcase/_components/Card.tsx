import React from 'react';

import Image from '@theme/IdealImage';

import {
  Node,
  ShowcaseNetwork,
  sortBy,
  Tag,
  TagList,
  Tags,
  TagType,
} from '../../../utils/showcase';

interface Props extends Tag {
  id: string;
}

const mapUrl = (nodes: Node[]): string => {
  const width = 900;
  const height = 400;
  const access_token =
    "pk.eyJ1Ijoic2FjaGF3IiwiYSI6ImNrNW9meXozZjBsdW0zbHBjM2FnNnV6cmsifQ.3E4n8eFGD9ZOFo-XDVeZnQ";
  const nodeCoords = nodes.map(
    ({ latitude, longitude }) => `pin-l+67ea94(${longitude},${latitude})`
  );

  return `https://api.mapbox.com/styles/v1/mapbox/satellite-v9/static/${nodeCoords}/auto/${width}x${height}@2x?access_token=${access_token}`;
};

const CardTags = ({ tags }: { tags: TagType[] }) => {
  const tagObjects = tags.map((tag) => ({ tag, ...Tags[tag] }));
  const tagObjectsSorted = sortBy(tagObjects, (tagObject) =>
    TagList.indexOf(tagObject.tag)
  );

  return (
    <ul className="pills">
      {tagObjectsSorted.map(({ color, description, label }, index) => {
        return (
          <li
            key={index}
            style={{
              display: "inline-flex",
              alignItems: "center",
              alignContent: "center",
              gap: "0.3rem",
              fontSize: "0.6rem",
              lineHeight: "1rem",
              cursor: "default",
              userSelect: "none",
              padding: "0.2rem",
              border: "2px solid gray",
            }}
            className="pills__item"
            title={description}
          >
            <span>{label.toLowerCase()}</span>
            <span
              style={{
                backgroundColor: color,
                width: "0.5rem",
                height: "0.5rem",
                borderRadius: "50%",
              }}
            />
          </li>
        );
      })}
    </ul>
  );
};

export const Card = React.memo(
  ({ showcaseNetwork }: { showcaseNetwork: ShowcaseNetwork }) => (
    <div className="card">
      <div className="card__image">
        <Image
          img={mapUrl(showcaseNetwork.nodes)}
          alt={showcaseNetwork.title}
        />
      </div>
      <div className="card__body">
        <h4>{showcaseNetwork.title}</h4>
        <small>{showcaseNetwork.description}</small>
      </div>
      <div className="card__footer">
        <a
          href={`?id=${showcaseNetwork.id}`}
          className="button button--primary button--block"
          style={{ marginBottom: "0.5rem" }}
        >
          Get Started
        </a>
        <CardTags tags={showcaseNetwork.tags} />
      </div>
    </div>
  )
);
