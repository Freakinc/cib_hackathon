import React, { useEffect, useState } from 'react';
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { useParams } from 'react-router-dom';
import api from '../../api';
import { Loader, PolygonElement, PointElement } from '../../components';
import {
  Checkbox,
  useTheme,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from '@mui/material';
import { Column } from '../types';
import { observer } from 'mobx-react-lite';
import { useMst } from '../../models/Root';
import { Map } from '..';
import { ArrowDownward } from '@mui/icons-material';

const AlertsReport = () => {
  const { id } = useParams<{ id: string }>();
  const { zones } = useMst();
  const [selected, setSelected] = useState<string[]>([]);
  const [map, setMap] = useState<{ floor: number; zone: string } | null>(null);
  const theme = useTheme();
  const {
    reports: { alertReport },
  } = useMst();

  useEffect(() => {
    alertReport.load(id);
  }, [id]);

  if (alertReport.state === 'pending') {
    return <Loader />;
  }

  const columns: readonly Column[] = [
    // {
    //   id: 'checkbox',
    //   label: '',
    // },
    {
      id: 'user_id',
      label: 'ID пользователя',
    },
    {
      id: 'type',
      label: 'Тип события',
    },
    {
      id: 'incident_time',
      label: 'Время события',
    },
    {
      id: 'zone_id_work_place',
      label: 'ID рабочего места',
    },
    {
      id: 'zone_id_router',
      label: 'ID роутера',
    },
  ];
  const rows = alertReport.items;

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    setSelected([name]);
  };
  const renderMap = () => {
    if (selected.length === 0) {
      return null;
    }
    const workPlace = zones.floorByZone({ zoneId: rows[selected[0]].zone_id_work_place });
    const routerPlace = zones.floorByZone({ zoneId: rows[selected[0]].zone_id_router });

    // console.log(mapData);
    const { zone: workPlaceZone } = workPlace;
    const { zone: routerZone } = routerPlace;

    const row = rows[selected[0]];
    const routerCoords = JSON.parse(row.router_coordinates).coordinates;
    const workPlaceCoords = JSON.parse(row.work_place).coordinates;
    const workplaceMarker = (
      <>
        <PolygonElement
          key={`zone of floor-${workPlaceZone.id}`}
          id={workPlaceZone.id}
          name={workPlaceZone.name}
          type={workPlaceZone.type}
          // color={theme.palette.info.light}
          gradient
          coords={JSON.parse(workPlaceZone.json).coordinates[0]}
        />
        <PointElement name={row.zone_id_work_place} coords={workPlaceCoords} id={row.zone_id_work_place} />
      </>
    );

    console.log('r---oro', JSON.parse(row.router_coordinates));
    const routerMarker = (
      <>
        <PolygonElement
          key={`zone of floor-${routerZone.id}`}
          id={routerZone.id}
          name={routerZone.name}
          type={routerZone.type}
          // color={theme.palette.info.light}
          gradient
          coords={JSON.parse(routerZone.json).coordinates[0]}
        />
        <PointElement name={row.router_id} coords={routerCoords} id={row.router_id} color="greenyellow" />
      </>
    );

    const maps = (
      <>
        <Map floor={workPlace.floor} markers={workplaceMarker} hideControls />
        <div
          css={css`
            display: flex;
            justify-content: center;
            margin: 3rem;
          `}
        >
          <ArrowDownward fontSize="large" />
        </div>
        <Map floor={routerPlace.floor} markers={routerMarker} hideControls />;
      </>
    );
    return maps;
  };

  return (
    <div>
      {rows.length > 0 ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead style={{ background: theme.palette.grey.A200 }}>
              <TableRow>
                <TableCell />
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => {
                // const key = row.to_char + row.user_name + row.zone_name;
                const key = index + '';
                const isSelected = (name: string) => selected.indexOf(name) !== -1;
                const isItemSelected = isSelected(key);
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <TableRow onClick={(event) => handleClick(event, key)} hover role="checkbox" tabIndex={-1} key={key}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id + column.label} align={column.align}>
                          {column.format ? column.format(value) : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <div>Нет данных для отображения</div>
      )}
      {renderMap()}
    </div>
  );
};

export default observer(AlertsReport);
