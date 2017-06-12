// @flow
import React from 'react';
import styled from 'styled-components';
import { Thumbnail } from 'react-bootstrap';

import Preview from '../Preview';

const SizedThumbnail = styled(Thumbnail) `
  width: 240px;
  height: 378px;
`;

const ellipsis = (component: ReactClass<any>) => styled(component)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Header = ellipsis(({ children, ...props }) => <h3 {...props}>{children}</h3>);
const Paragraph = ellipsis(({ children, ...props }) => <p {...props}>{children}</p>);

type CardProps = {
  track: Track,
  style?: any,
  className?: string,
};

const Card = ({ track, style, className }: CardProps) => {
  const { image, album, name, artists } = track;
  const artistsString = artists
    .map(({ name }) => name)
    .join(', ');

  return (
    <SizedThumbnail src={image} alt={album} style={style} className={className}>
      <Header>{name}</Header>
      <Paragraph>{artistsString} - {album}</Paragraph>
      <div>
        <Preview track={track} />
      </div>
    </SizedThumbnail>
  );
};

Card.defaultProps = { style: {} };

const BackgroundCard = styled(Card) `
  position: relative;
  margin-top: -398px;
  z-index: -1;
`;

export default Card;
export {
  BackgroundCard,
};