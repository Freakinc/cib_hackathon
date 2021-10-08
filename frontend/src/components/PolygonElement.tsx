import React, { useState } from 'react';
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { ZoneItemInstance, zoneTypes } from '../models/Zones';
import { useTheme } from '@mui/material';

type Point = number;

type Coords = {
  x: Point;
  y: Point;
  x1: Point;
  y1: Point;
};

type ElementProps = {
  id: string | number;
  coords: Array<[number, number]>;
  name: string;
  type: typeof zoneTypes[number];
  color?: string;
  gradient?: boolean;
};

const PolygonElement: React.FC<ElementProps> = ({ gradient, color, type, coords, id, name }: ElementProps) => {
  const { palette } = useTheme();
  console.log('theme - ', palette);
  const [toolTip, showTooltip] = useState(false);
  const onClick = (id: string) => {
    console.log('click', id);
  };

  const getColor = () => {
    let newColor = '';
    if (color) {
      return color;
    }

    // if (gradient) {
    //   return 'url(#MyGradient)';
    // }
    switch (type) {
      case 'hall':
        newColor = palette.secondary.main;
        break;
      case 'open_space':
        newColor = palette.primary.main;
        break;
      case 'conf':
        newColor = palette.warning.main;
        break;
      case 'kitchen':
        newColor = palette.success.main;
        break;
      case 'room':
        newColor = 'red';
        break;
      default:
        break;
    }
    console.log('color---- ', newColor);
    return newColor;
  };

  const textCoords = {
    x: (coords[2][0] + coords[0][0]) / 2,
    y: (coords[2][1] + coords[0][1]) / 2,
  };

  const points = coords.map((e) => e.join(',')).join(' ');

  console.log('--- color', getColor());
  return (
    <>
      <polygon
        css={css`
          fill: ${getColor()};
          stroke: ${gradient ? 'black' : 'gray'};
          stroke-width: ${gradient ? '3px' : '1px'};
        `}
        points={points}
        onMouseEnter={() => showTooltip(true)}
        onMouseLeave={() => showTooltip(false)}
        onClick={() => onClick('the id')}
      />
      <text fontSize={3} textAnchor="middle" x={textCoords.x} y={textCoords.y}>
        {name}
      </text>
    </>
  );
};

export default PolygonElement;
