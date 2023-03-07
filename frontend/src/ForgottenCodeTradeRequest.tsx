import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
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

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function ForgottenCodeTradeRequest() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '15vw', minWidth: "11rem" }}
            justifyContent="center"
            alignItems="center">
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="خرید" {...a11yProps(0)} />
                    <Tab label="فروش" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <Box sx={{ display: "grid", minWidth: "13vw" }}>
                    <TextField id="outlined" type="number" label="قیمت" variant="outlined" sx={{ m: 1 }} />
                    <Button variant="text" sx={{ color: "#000000" }}>خرید</Button>
                </Box>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Box sx={{ display: "grid", minWidth: "13vw" }}>
                    <TextField id="outlined" type="number" label="کد" variant="outlined" sx={{ m: 1 }} />
                    <TextField id="outlined" type="number" label="قیمت" variant="outlined" sx={{ m: 1 }} />
                    <Button variant="text" sx={{ color: "#000000" }}>فروش</Button>
                </Box>
            </TabPanel>
        </Box>
    );
}