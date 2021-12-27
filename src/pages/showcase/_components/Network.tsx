import React from 'react';

import JSONPretty from 'react-json-pretty';
import useSWR from 'swr';

import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { Showcase } from '@site/src/utils/apiTypes';
import { User } from '@site/src/utils/github';
import { fetcher } from '@site/src/utils/swr';

interface NetworkProps {
  id: string;
}

export const Network = ({ id }: NetworkProps): JSX.Element => {
  const { siteConfig } = useDocusaurusContext();

  const { data, error } = useSWR<Showcase>(
    `${siteConfig.customFields.API_URL}/showcase/${id}`,
    fetcher
  );

  const githubData = useSWR<User>(
    `https://api.github.com/users/${data?.author?.githubUsername}`,
    fetcher
  ).data;

  return (
    <div>
      {data && !error ? (
        <div className="container">
          <h1>{data.title}</h1>
          <p>{data.summary}</p>
          {githubData && (
            <div className="avatar">
              <img
                src={githubData.avatar_url}
                alt={githubData.name}
                className="avatar__photo"
              />
              <div className="avatar__intro">
                <div className="avatar__name">{githubData.name}</div>
                <div className="avatar__subtitle">{githubData.bio}</div>
              </div>
            </div>
          )}
          <div className="markdown">{data.body}</div>

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
              {data.materials?.map((material, index) => (
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
                    <small className="avatar__subtitle">
                      {material.details}
                    </small>
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
          {error && (
            <div>
              <JSONPretty data={error} />
            </div>
          )}
          {!data && <PlaceholderNetwork />}
        </div>
      )}
    </div>
  );
};

export const PlaceholderNetwork = (): JSX.Element => {
  return (
    <div
      className="container"
      style={{
        display: "flex",
        flexDirection: window.innerWidth > 768 ? "row" : "column",
        gap: "2rem",
      }}
    >
      <div
        style={{
          width: window.innerWidth > 768 ? "60%" : "100%",
        }}
      >
        <div
          className="card"
          style={{
            width: "100%",
            animation: "pulse 2s infinite",
            transform: "scale(1)",
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
            padding: "2rem",
          }}
        >
          <div
            style={{
              borderRadius: "0.4rem",
              backgroundColor: "gray",
              height: "4rem",
            }}
          />
          <div
            style={{
              borderRadius: "0.4rem",
              backgroundColor: "gray",
              height: "12rem",
            }}
          />
          <div style={{ display: "flex", gap: "1rem" }}>
            <div
              style={{
                borderRadius: "999px",
                backgroundColor: "gray",
                height: "4rem",
                width: "4rem",
                minWidth: "4rem",
              }}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                width: "100%",
              }}
            >
              <div
                style={{
                  width: "100%",
                  borderRadius: "0.4rem",
                  backgroundColor: "gray",
                  height: "1rem",
                }}
              />
              <div
                style={{
                  width: "100%",
                  borderRadius: "0.4rem",
                  backgroundColor: "gray",
                  height: "2rem",
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          width: window.innerWidth > 768 ? "40%" : "100%",
        }}
      >
        <div
          className="card"
          style={{
            width: "100%",
            animation: "pulse 2s infinite",
            transform: "scale(1)",
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
            padding: "2rem",
          }}
        >
          <div
            style={{
              borderRadius: "0.4rem",
              backgroundColor: "gray",
              height: "12rem",
            }}
          />
          <div
            style={{
              borderRadius: "0.4rem",
              backgroundColor: "gray",
              height: "2rem",
            }}
          />
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <div
              style={{
                width: "7rem",
                height: "1.8rem",
                borderRadius: "0.4rem",
                backgroundColor: "gray",
              }}
            />
            <div
              style={{
                width: "7rem",
                height: "1.8rem",
                borderRadius: "0.4rem",
                backgroundColor: "gray",
              }}
            />
            <div
              style={{
                width: "7rem",
                height: "1.8rem",
                borderRadius: "0.4rem",
                backgroundColor: "gray",
              }}
            />
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <div style={{ display: "flex", gap: "1rem" }}>
              <div
                style={{
                  borderRadius: "0.4rem",
                  backgroundColor: "gray",
                  height: "2.5rem",
                  width: "20%",
                }}
              />
              <div
                style={{
                  borderRadius: "0.4rem",
                  backgroundColor: "gray",
                  height: "2.5rem",
                  width: "60%",
                }}
              />
              <a
                className="button disabled button--primary button--block"
                style={{ width: "20%" }}
              >
                &nbsp;
              </a>
            </div>
            <div style={{ display: "flex", gap: "1rem" }}>
              <div
                style={{
                  borderRadius: "0.4rem",
                  backgroundColor: "gray",
                  height: "2.5rem",
                  width: "20%",
                }}
              />
              <div
                style={{
                  borderRadius: "0.4rem",
                  backgroundColor: "gray",
                  height: "2.5rem",
                  width: "60%",
                }}
              />
              <a
                className="button disabled button--primary button--block"
                style={{ width: "20%" }}
              >
                &nbsp;
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
