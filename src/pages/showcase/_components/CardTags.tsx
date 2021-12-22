import React from 'react';

import { ShowcaseTag } from '../../../utils/apiTypes';

export interface CardTagsProps {
  tags: ShowcaseTag[];
}

export const CardTags = ({ tags }: CardTagsProps) => {
  return (
    <ul className="pills">
      {tags.map(({ color, description, label }, index) => {
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
