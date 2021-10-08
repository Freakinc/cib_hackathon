import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api';
import { Loader, PolygonElement } from '../../components';
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

const TimeZoneReport = () => {
  const { id } = useParams<{ id: string }>();
  const { zones } = useMst();
  const [selected, setSelected] = useState<string[]>([]);
  const [map, setMap] = useState<{ floor: number; zone: string } | null>(null);
  const theme = useTheme();
  const {
    reports: { timeZoneReport },
  } = useMst();

  useEffect(() => {
    timeZoneReport.load(id);
  }, [id]);

  if (timeZoneReport.state === 'pending') {
    return <Loader />;
  }

  const columns: readonly Column[] = [
    // {
    //   id: 'checkbox',
    //   label: '',
    // },
    {
      id: 'user_name',
      label: 'Имя пользователя',
    },
    {
      id: 'to_char',
      label: 'Время входа',
    },
    {
      id: 'zone_name',
      label: 'Название зоны',
    },
  ];
  const rows = timeZoneReport.items;

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    setSelected([name]);
  };

  const renderMap = () => {
    if (selected.length === 0) {
      return null;
    }
    const mapData = zones.floorByZone(rows[selected[0]].zone_name);

    console.log(mapData);
    const { floor, zone } = mapData;
    console.log('floor', floor);
    const markers = (
      <PolygonElement
        key={`zone of floor-${zone.id}`}
        id={zone.id}
        name={zone.name}
        type={zone.type}
        // color={theme.palette.info.light}
        gradient
        coords={JSON.parse(zone.json).coordinates[0]}
      />
    );
    return <Map floor={floor} markers={markers} />;
  };

  return (
    <div>
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
      {renderMap()}
    </div>
  );
};

export default observer(TimeZoneReport);
