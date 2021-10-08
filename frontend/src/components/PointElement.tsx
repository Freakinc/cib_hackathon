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
  coords: [number, number];
  name: string;
  color?: string;
  gradient?: boolean;
};

const PointElement: React.FC<ElementProps> = ({ gradient, color, coords, id, name }: ElementProps) => {
  const { palette } = useTheme();
  const [toolTip, showTooltip] = useState(false);
  const onClick = (id: string) => {
    console.log('click', id);
  };

  const [x, y] = coords;

  console.log('--x, y', x, y);
  return (
    <>
      <circle
        css={css`
          fill: ${color || 'magenta'};
        `}
        cx={x}
        cy={y}
        r={5}
        // onMouseEnter={() => showTooltip(true)}
        // onMouseLeave={() => showTooltip(false)}
        // onClick={() => onClick('the id')}
      />
    </>
  );
};

export default PointElement;
