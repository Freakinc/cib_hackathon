import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useHistory } from 'react-router-dom';

const MainMenu = () => {
  const menuItems = [
    {
      label: 'Отчеты',
      value: 'reports',
    },
    {
      label: 'Карта',
      value: 'map',
    },
  ];
  const [value, setValue] = useState(menuItems[0].value);
  const history = useHistory();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    console.log('values', newValue);
    history.push('/' + newValue);
    setValue(newValue);
  };

  const onClick = (value: string) => {
    history.push('/' + value);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          {menuItems.map((item, idx) => {
            const { label, value } = item;
            return <Tab key={`mainMenu item - ${idx}`} label={label} value={value} onClick={() => onClick(value)} />;
          })}
        </Tabs>
      </Box>
    </Box>
  );
};

export default MainMenu;
