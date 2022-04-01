import React from 'react';

export const BatteryCalculator = (): JSX.Element => {
  return (
    <div className="card">
      <div className="card__header">
        <h3>Battery Calculator</h3>
      </div>
      <div className="card__body" style={{ display: 'flex', gap: '2rem' }}>
        <div>
          <input placeholder="Search" />
          <input placeholder="Search" />
          <input placeholder="Search" />
          <input placeholder="Search" />
        </div>
        <div></div>
      </div>
      <div className="card__footer">
        <button className="button button--secondary button--block">
          See All
        </button>
      </div>
    </div>
  );
};
