import type React from 'react';

export interface releaseCardProps {
  client: string;
  imgUrl: string;
  url: string;
  notes: string;
  buttonText: string;
}

export const DownloadCard = ({
  client,
  imgUrl,
  url,
  notes,
  buttonText,
}: releaseCardProps): JSX.Element => {

  const button = React.createElement(
    'a',
    {href: url, className: "button button--secondary button--block"},
    buttonText
  )
  const img = React.createElement(
    'img',
    {style: {height: '4rem'}, src: imgUrl, href: url},
    null
  )

  const anchorImg = <a href={url}>{buttonText ? null : img}</a>

  return (
    <div className="card">
      <div
        className="card__header"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <h3>{client}</h3>
      </div>
      <div
        className="card__body"
        style={{ display: "flex", justifyContent: "center"}}
      >
        {buttonText ? button : anchorImg}
      </div>
      <div className="card__footer">
        {notes ? notes : null}
      </div>
    </div>
  );
};

export const PlaceholderFirmwareCard = (): JSX.Element => {
  return (
    <div
      className="card"
      style={{
        width: "100%",
        animation: "pulse 2s infinite",
        transform: "scale(1)",
        display: "flex",
        gap: "1rem",
        padding: "1rem",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "1rem",
        }}
      >
        <div
          style={{
            borderRadius: "0.4rem",
            backgroundColor: "gray",
            height: "2rem",
            width: "8rem",
          }}
        />
        <div
          style={{
            borderRadius: "0.4rem",
            backgroundColor: "gray",
            marginTop: "1rem",
            height: "1rem",
            width: "8rem",
          }}
        />
      </div>
      <div
        className="card__body"
        style={{
          borderRadius: "0.4rem",
          backgroundColor: "gray",
          height: "3rem",
          display: "flex",
          jusifyContent: "center",
          alignItems: "center",
        }}
      />
      <a className="button disabled button--primary button--block">&nbsp;</a>
      <div
        style={{
          borderRadius: "0.4rem",
          backgroundColor: "gray",
          width: "8rem",
          height: "2rem",
        }}
      />
      <div
        style={{
          borderRadius: "0.4rem",
          backgroundColor: "gray",
          width: "11rem",
          height: "1rem",
        }}
      />
      <div
        style={{
          borderRadius: "0.4rem",
          backgroundColor: "gray",
          width: "9rem",
          height: "1rem",
        }}
      />
      <div
        style={{
          borderRadius: "0.4rem",
          backgroundColor: "gray",
          width: "13rem",
          height: "1rem",
        }}
      />
      <div
        style={{
          borderRadius: "0.4rem",
          backgroundColor: "gray",
          width: "11rem",
          height: "1rem",
        }}
      />
    </div>
  );
};
