// @flow
import React from 'react';
import styled from 'styled-components';
import { Thumbnail, Glyphicon } from 'react-bootstrap';

import Preview from './Preview';
import Button from './Button';

const SizedThumbnail = styled(Thumbnail) `
  width: 300px;
  height: 438px;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  padding: 0;
  border: none;
`;

const ellipsis = (component: ReactClass<any>) => styled(component) `
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Header = ellipsis(({ children, ...props }) => <h3 {...props}>{children}</h3>);
const Paragraph = ellipsis(({ children, ...props }) => <p {...props}>{children}</p>);

type CardProps = {
  track?: Track,
  style?: any,
  className?: string,
  onLoadMore?: () => {},
};

const Card = ({ track, style, className, onLoadMore }: CardProps) => {
  if (!track) {
    const image = '/no_cover.png';
    return (
      <SizedThumbnail src={image} alt="No Cover" style={style} className={className}>
        <Header>No More Tracks</Header>
        <Paragraph>To load more Click:</Paragraph>
        <div>
          <Button block spotify glyph onClick={onLoadMore}>
            Load More
            <Glyphicon glyph="refresh"/>
          </Button>
        </div>
      </SizedThumbnail>
    )
  }

  const { image, album, name, artists } = track;
  const artistsString = artists
    .map(({ name }) => name)
    .join(', ');

  return (
    <SizedThumbnail src={image} alt={album} style={style} className={className}>
      <Header>{name}</Header>
      <Paragraph>{artistsString} - {album}</Paragraph>
      <div>
        <Preview block track={track} />
      </div>
    </SizedThumbnail>
  );
};

Card.defaultProps = { style: {}, onLoadMore: () => {} };

const BackgroundCard = styled(Card) `
  position: relative;
  margin-top: -458px;
`;

export default Card;
export {
  BackgroundCard,
};