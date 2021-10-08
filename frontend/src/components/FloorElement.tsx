import React, { useState } from 'react';
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { ZoneItemInstance, zoneTypes } from '../models/Zones';

type Point = number;

type Coords = {
  x: Point;
  y: Point;
  x1: Point;
  y1: Point;
};

type ElementProps = {
  id: string | number;
  coords: Coords;
  name: string;
  type: typeof zoneTypes[number];
};

const Element: React.FC<ElementProps> = ({ type, coords, id, name }: ElementProps) => {
  const [toolTip, showTooltip] = useState(false);
  const onClick = (id: string) => {
    console.log('click', id);
  };
  console.log('render rect');

  const getColor = () => {
    let color = '';

    switch (type) {
      case 'hall':
        color = 'red';
        break;
      case 'open_space':
        color = 'blue';
        break;
      case 'conf':
        color = 'green';
      case 'kitchen':
        color = 'orange';
      case 'floor':
        color = 'grey';
      case 'room':
        color = 'red';
      default:
        break;
    }
    return color;
  };
  // const color = 'green';
  toolTip && console.log('name', name);

  const rectSize = {
    x: coords.x,
    y: coords.y,
    width: coords.x1 - coords.x,
    height: coords.y1 - coords.y,
  };
  const [x, y, width, height] = [coords.x, coords.y, coords.x1 - coords.x, coords.y1 - coords.y];
  const textCoords = { x: width / 2 + x, y: height / 2 + y };
  return (
    <>
      <rect
        css={css`
          fill: ${getColor()};
        `}
        x={x}
        y={y}
        // x="0"
        // y="0"
        width={width}
        height={height}
        // {...rectSize}
        onMouseEnter={() => showTooltip(true)}
        onMouseLeave={() => showTooltip(false)}
        onClick={() => onClick('the id')}
      />
      <text fontSize={10} textAnchor="middle" x={textCoords.x} y={textCoords.y}>
        {type}
      </text>
      {/* <foreignobject x="0" y="0" width="250" height="250">
        <body xmlns="http://www.w3.org/1999/xhtml">
          <div>Here is a long text that runs more than one line and works as a paragraph</div>
          <br />
          <div>
            This is <u>UNDER LINE</u> one
          </div>
          <br />
          <div>
            This is <b>BOLD</b> one
          </div>
          <br />
          <div>
            This is <i>Italic</i> one
          </div>
        </body>
      </foreignobject> */}
    </>
  );
};

export default Element;
