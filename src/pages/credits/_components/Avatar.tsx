import React from 'react';

export interface avatarProps {
  imgUrl: string;
  name?: string;
  userName?: string;
  description?: string;
}

export interface avatarLayoutProps {
  list: list[];
}

export const Avatar = ({
  imgUrl,
  name,
  userName,
  description,
}: avatarProps): JSX.Element => {
  return (
    <div className="card m-4 border-2 border-secondary">
      <div className="card__body">
        <div className="avatar">
          <img
            className="avatar__photo avatar__photo--sm"
            src={imgUrl}
          />
          <div className="avatar__intro">
            <div className="avatar__name">
              {name}
            </div>
            <small class="avatar__subtitle">
              {description}
            </small>
          </div>
        </div>
      </div>
    </div>
  )
}

export const AvatarLayout = ({
  list
} :avatarLayoutProps): JSX.Element => {
  return (
    <div className="container">
      <div className="flex flex-wrap justify-center bg-primary">
        {list.map((e) => {
          return <Avatar/>
          })
        }
      </div>
    </div>
  )
}
