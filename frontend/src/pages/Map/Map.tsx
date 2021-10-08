/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import React, { useEffect, useState } from 'react';
import { FloorElement, PolygonElement } from '../../components';
import { IconButton, Tab, Tabs, Box, Typography } from '@mui/material';
import { ZoomIn, ZoomOut, ArrowDropDown, Circle } from '@mui/icons-material';
import { observer } from 'mobx-react-lite';
import { useMst } from '../../models/Root';

const ZOOM_FOR = 0.1;
const MOVE_FOR = 5;

type MapProps = {
  floor?: number;
  markers?: React.ReactElement;
  hideControls?: boolean;
};

const Map: React.FC<MapProps> = ({ hideControls, floor, markers }: MapProps) => {
  const {
    zones,
    zones: { state, building, floors },
  } = useMst();

  console.log('zones', zones);
  const [zoom, setZoom] = useState(1);
  const [move, setMove] = useState({ x: 0, y: 0 });
  const [currenFloor, setCurrentFloor] = useState(floor || 0);

  useEffect(() => {
    zones.load();
  }, []);

  if (state === 'pending') {
    return <div> ... loading</div>;
  }

  if (state === 'error') {
    return <div> got error </div>;
  }

  const zoomIn = () => {
    setZoom(zoom * ZOOM_FOR);
  };

  const zoomOut = () => {
    setZoom(zoom / ZOOM_FOR);
  };

  const moveTo = ({ x, y }: { x: number; y: number }) => {
    setMove({ x: move.x + x, y: move.y + y });
  };

  const mapControls = (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        height: 100%;
      `}
    >
      <IconButton onClick={zoomIn} color="primary" aria-label="upload picture" component="span">
        <ZoomIn fontSize="large" />
      </IconButton>
      <IconButton onClick={zoomOut} color="primary" aria-label="upload picture" component="span">
        <ZoomOut fontSize="large" />
      </IconButton>

      <div
        css={css`
          display: flex;
          flex-wrap: wrap;
          width: 5rem;
        `}
      >
        <div
          css={css`
            width: 100%;
            display: flex;
          `}
        >
          <IconButton
            onClick={() => moveTo({ x: 0, y: MOVE_FOR })}
            color="primary"
            aria-label="upload picture"
            component="span"
            style={{ margin: '0 auto', padding: 0, transform: 'rotate(180deg)' }}
          >
            <ArrowDropDown fontSize="large" />
          </IconButton>
        </div>
        <IconButton
          style={{ width: '33%', padding: 0, transform: 'rotate(90deg)' }}
          onClick={() => moveTo({ x: MOVE_FOR, y: 0 })}
          color="primary"
          aria-label="upload picture"
          component="span"
        >
          <ArrowDropDown fontSize="large" />
        </IconButton>
        <IconButton
          style={{ width: '33%', padding: 0, transform: 'rotate(-90deg)' }}
          onClick={() => setMove({ x: 0, y: 0 })}
          color="primary"
          aria-label="upload picture"
          component="span"
        >
          <Circle fontSize="small" />
        </IconButton>
        <IconButton
          style={{ width: '33%', padding: 0, transform: 'rotate(-90deg)' }}
          onClick={() => moveTo({ x: -MOVE_FOR, y: 0 })}
          color="primary"
          aria-label="upload picture"
          component="span"
        >
          <ArrowDropDown fontSize="large" />
        </IconButton>
        <IconButton
          style={{ margin: '0 auto', padding: 0, transform: 'rotate(0 deg)' }}
          onClick={() => moveTo({ x: 0, y: -MOVE_FOR })}
          color="primary"
          aria-label="upload picture"
          component="span"
        >
          <ArrowDropDown fontSize="large" />
        </IconButton>
      </div>
      {!markers && (
        <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={currenFloor}
            onChange={(e, value) => {
              setCurrentFloor(value);
            }}
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: 'divider' }}
          >
            {floors.map((fl, idx) => (
              <Tab label={fl.name} value={idx} key={`floor-menu-${idx}`} />
            ))}
          </Tabs>
        </Box>
      )}
    </div>
  );

  const drawZones = zones.floorZones(floors[currenFloor].id);

  const getCoords = (json: string) => {
    const obj = JSON.parse(json);
    const { coordinates } = obj;

    const coords = {
      x: coordinates[0][0][0],
      y: coordinates[0][0][1],
      x1: coordinates[0][2][0],
      y1: coordinates[0][2][1],
    };
    return coords;
  };

  const buildingSize = JSON.parse(building.json).coordinates[0][2];

  console.log('floors', floors);
  console.log('floorNumber', floor);
  return (
    <div>
      <div css={css``}>
        <Typography variant="h5">Здание</Typography>
        <Typography variant="body1">{building.name}</Typography>
        <Typography variant="h6">Этаж</Typography>
        <Typography variant="body1">{floors[currenFloor].name}</Typography>
      </div>
      <div
        css={css`
          width: 100%;
          height: 100%;
          display: flex;
        `}
        id="map"
      >
        <div
          css={css`
            width: 100%;
            height: 100%;
          `}
        >
          <svg
            viewBox={`${move.x} ${move.y} ${buildingSize[0] + zoom} ${buildingSize[1] + zoom}`}
            xmlns="http://www.w3.org/2000/svg"
          >
            <FloorElement name={building.name} type="building" coords={getCoords(building.json)} id="1" />
            {drawZones.map((zone) => (
              <PolygonElement
                key={`zone of floor-${zone.id}`}
                id={zone.id}
                name={zone.name}
                type={zone.type}
                coords={JSON.parse(zone.json).coordinates[0]}
              />
            ))}
            {markers}
          </svg>
        </div>
        {!hideControls && <div>{mapControls}</div>}
      </div>
    </div>
  );
};

export default observer(Map);
