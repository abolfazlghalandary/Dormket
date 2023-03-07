import * as React from 'react';
import Paper from '@mui/material/Paper';
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  LineSeries,
} from '@devexpress/dx-react-chart-material-ui';

const data = [
  { argument: "1401/12/15", value: 10000 },
  { argument: "1401/12/16", value: 80000 },
  { argument: "1401/12/17", value: 50000 },
  { argument: "1401/12/18", value: 40000 },
  { argument: "1401/12/19", value: 35000 },
];

function Income() {
  return (
    <Paper>
      <Chart
        data={data}
      >
        <ArgumentAxis />
        <ValueAxis />

        <LineSeries valueField="value" argumentField="argument" />
      </Chart>
    </Paper>
  );
} 

export default Income;