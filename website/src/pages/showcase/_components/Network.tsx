import React from 'react';

import { networks } from '../../../data/networks/_overview';
import { NetworkWriteup } from '../../../utils/showcase';

interface NetworkProps {
  id: string;
}

export const Network = ({ id }: NetworkProps): JSX.Element => {
  import(`../../../data/networks/${id}/writeup.ts`).then((data) => {
    setNetworkWriteup(data.writeup as NetworkWriteup);
  });

  //   console.log(data);
  const [networkWriteup, setNetworkWriteup] = React.useState<NetworkWriteup>();
  React.useEffect(() => {
    // data.then((data) => setNetworkWriteup(data));
  }, []);

  const network = networks.find((network) => network.id === id);

  return network && networkWriteup ? (
    <div className="container">
      <h1>{network.title}</h1>
      <p>{network.description}</p>
      <div className="avatar">
        <img
          src={networkWriteup.author.avatarUrl}
          alt={networkWriteup.author.name}
          className="avatar__photo"
        />
        <div className="avatar__intro">
          <div className="avatar__name">{networkWriteup.author.name}</div>
          <div className="avatar__subtitle">{networkWriteup.author.about}</div>
        </div>
      </div>

      {networkWriteup.body.map((segment, index) => (
        <div key={index}>
          <h2>{segment.heading}</h2>
          <p>{segment.body}</p>
        </div>
      ))}

      <div
        className="card"
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          maxWidth: "900px",
        }}
      >
        <div
          className="card__header"
          style={{
            margin: "8px",
          }}
        >
          <h2>Bill of Materials</h2>
        </div>
        <div className="card__body">
          {networkWriteup.bom.map((material, index) => (
            <div
              key={index}
              style={{
                borderTop: "2px solid gray",
                display: "flex",
              }}
            >
              <div
                style={{
                  width: "4rem",
                  display: "flex",
                }}
              >
                <img
                  src={material.image}
                  height="auto"
                  width="100%"
                  style={{
                    margin: "auto",
                    padding: "4px",
                    display: "block",
                    maxWidth: "60px",
                    maxHeight: "60px",
                    width: "auto",
                    height: "auto",
                  }}
                />
              </div>
              <div className="avatar__intro">
                <div className="avatar__name">{material.name}</div>
                <small className="avatar__subtitle">{material.details}</small>
              </div>
              <a
                target="_blank"
                href={material.url}
                className="button button--outline button--secondary"
                style={{
                  marginTop: "auto",
                  marginBottom: "auto",
                }}
              >
                View
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <div>
      <h1>Network not found</h1>
    </div>
  );
};
