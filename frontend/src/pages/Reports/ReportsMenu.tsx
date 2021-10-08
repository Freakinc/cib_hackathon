import React, { useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useHistory, useParams } from 'react-router-dom';

const ReportMenu = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();

  const menuItems = [
    { label: 'Время пребывания', value: 'time' },
    { label: 'Посещенные зоны', value: 'zones' },
    { label: 'Время в зонах', value: 'zone-time' },
    { label: 'Нарушения', value: 'alerts' },
  ];
  const firstValue = menuItems[0].value;
  const [value, setValue] = React.useState(firstValue);
  useEffect(() => {
    history.push('/reports/' + id + '/' + firstValue);
    setValue(firstValue);
  }, [id]);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    console.log('values', newValue);
    history.push('/reports/' + id + '/' + newValue);
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          {menuItems.map((item, idx) => (
            <Tab key={`second-menuItem-${idx}`} label={item.label} value={item.value} />
          ))}
        </Tabs>
      </Box>
    </Box>
  );
};

export default ReportMenu;
