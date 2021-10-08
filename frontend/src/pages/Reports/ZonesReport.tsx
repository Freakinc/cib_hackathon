import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api';
import { Loader } from '../../components';
import { useTheme, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import { Column } from '../types';
import dayjs from 'dayjs';
import { useMst } from '../../models/Root';
import { observer } from 'mobx-react-lite';

const ZonesReport = () => {
  const { id } = useParams<{ id: string }>();
  const theme = useTheme();
  const {
    reports: { zoneReport },
  } = useMst();

  useEffect(() => {
    zoneReport.load(id);
  }, [id]);

  if (zoneReport.state === 'pending') {
    return <Loader />;
  }

  const columns: readonly Column[] = [
    {
      id: 'entry_day',
      label: 'Дата входа',
    },
    {
      id: 'time_spent',
      label: 'Проведено времени',
    },
    {
      id: 'user_name',
      label: 'Сотрудник',
    },
    {
      id: 'zone_name',
      label: 'Назване зоны',
    },
  ];
  const rows = zoneReport.items;

  return (
    <div>
      {rows.length > 0 ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead style={{ background: theme.palette.grey.A200 }}>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.entry_day + row.user_name + row.time_spent}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number' ? column.format(value) : value}
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
    </div>
  );
};

export default observer(ZonesReport);
