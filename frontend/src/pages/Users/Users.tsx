import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useMst } from '../../models/Root';
import { Loader } from '../../components';
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
import { useHistory } from 'react-router-dom';
import { Column } from '../types';

const Reports = () => {
  const { users } = useMst();
  const theme = useTheme();
  const history = useHistory();

  const [selected, setSelected] = useState<string>('');
  useEffect(() => {
    users.load();
  }, []);

  if (users.state === 'pending') {
    return <Loader />;
  }

  if (users.state === 'error') {
    return null;
  }

  const columns: readonly Column[] = [
    {
      id: 'id',
      label: 'id',
      minWidth: 20,
    },
    { id: 'name', label: 'Сотрудник', minWidth: 100 },
    { id: 'zoneId', label: 'Id зоны' },
  ];

  const rows = users.items;

  const handleClick = (e, key) => {
    setSelected(key);
    history.push(`/reports/${key}`);
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead style={{ background: theme.palette.grey.A200 }}>
            <TableRow>
              {/* <TableCell /> */}
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => {
              const key = row.id;
              // const isSelected = (name: number) => selected.indexOf(name.toString()) !== -1;
              const isItemSelected = key === +selected;
              const labelId = `enhanced-table-checkbox-${index}`;
              return (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={row.id}
                  onClick={(event) => handleClick(event, key)}
                  style={{ cursor: 'pointer' }}
                >
                  {columns.map((column) => {
                    // <TableCell padding="checkbox">
                    //   <Checkbox
                    //     color="primary"
                    //     checked={isItemSelected}
                    //     inputProps={{
                    //       'aria-labelledby': labelId,
                    //     }}
                    //   />
                    // </TableCell>;
                    const value = row[column.id];
                    return (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ background: row.id === +selected ? 'gray' : 'inherit' }}
                      >
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
    </div>
  );
};

export default observer(Reports);
