// Tab.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs({ children }) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'background.paper' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          centered
          TabIndicatorProps={{
            style: {
              backgroundColor: 'white', // Change the tab indicator color
            },
          }}
          sx={{ color: 'white' }} // Change the tab text color
        >
          <Tab
            label="Row Truck"
            {...a11yProps(0)}
            sx={{
              backgroundColor: value === 0 ? 'gray' : '',
              color: value === 0 ? 'white' : 'inherit',
              borderRadius: '5', // Add square border radius
            }}
            {...a11yProps(0)}
          />
          <Tab label="Mobile Wheel" {...a11yProps(1)} />
          <Tab label="Car Repair" {...a11yProps(2)} />
        </Tabs>
      </Box>
      {React.Children.map(children, (child, index) => (
        <CustomTabPanel key={index} value={value} index={index}>
          {child}
        </CustomTabPanel>
      ))}
    </Box>
  );
}
