import React, { useEffect, useState } from 'react';

import { PieChart, Pie, Tooltip, Cell } from 'recharts'; 
import '../styles/DevPage.scss'

import { DataGrid } from '@mui/x-data-grid';


import {foundationName,links} from '../constans/constans'

export default function DevPage() {
  
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
      const RADIAN = Math.PI / 180;
      const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
      const x = cx + radius * Math.cos(-midAngle * RADIAN);
      const y = cy + radius * Math.sin(-midAngle * RADIAN);
    
      return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
          {`${(percent * 100).toFixed(0)}%`}
        </text>
      );
    };
    
  
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const spreadsheetId = '1qWjTG3MhMOUktyjkTF_W-DWkWe3P7pJJfOVd-1DofRc';
    const range = 'Sheet1!A1:G';
    
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(
            `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:json&range=${range}`
          );
          const text = await response.text();
          const jsonData = JSON.parse(text.substr(47).slice(0, -2));
          const rows = jsonData.table.rows.map(row => row.c.map(cell => cell ? cell.v : ''));
          setData(rows);
        } catch (err) {
          setError('Error fetching data');
          console.error(err);
        }
      };
      
      fetchData();
    }, [spreadsheetId, range]);
    
    
    
    const columns = [
      { field: 'id', headerName: 'ID', type: 'number', width: 70 },
      { field: 'ip', headerName: 'Ip', width: 200 },
      { field: 'time', headerName: 'Time', width: 300 },
      { field: 'foundation1',headerName: foundationName[0], type: 'number', width: 200,},
      { field: 'foundation2',headerName: foundationName[1], type: 'number', width: 250,},
      { field: 'foundation3',headerName: foundationName[2], type: 'number', width: 350,},
      { field: 'foundation4',headerName: foundationName[3], type: 'number', width: 350,},
    ];
    
    const rows =  data.map(row => ({
      id: row[0],
      ip: row[1],
      time: row[2],
      foundation1: row[3],
      foundation2: row[4],
      foundation3: row[5],
      foundation4: row[6],
    }));
    
  
    const toltalSumFound1 = data.reduce((sum, row) => sum + (row[3] || 0), 0);
    const toltalSumFound2 = data.reduce((sum, row) => sum + (row[4] || 0), 0);
    const toltalSumFound3 = data.reduce((sum, row) => sum + (row[5] || 0), 0);
    const toltalSumFound4 = data.reduce((sum, row) => sum + (row[6] || 0), 0);
  
    const [tickPlacement, setTickPlacement] = useState('bottom'); 
    const [tickLabelPlacement, setTickLabelPlacement] = useState('inside'); 
  
  
    const pieData = [
      { id: 0, value: toltalSumFound1, label: foundationName[0] },
      { id: 1, value: toltalSumFound2, label: foundationName[1] },
      { id: 2, value: toltalSumFound3, label: foundationName[2] },
      { id: 3, value: toltalSumFound4, label: foundationName[3] },
    ];
  
  
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#DDCC11'];
  
  
    const notify = () => {
      toast("Wow so easy!");
      console.log("asd");
    }
  
  
    const CustomPieChart = ({ series }) => {
      return (
        <PieChart width={1500} height={600}> 
          <Pie
          data={series[0].data}
          dataKey="value"
          nameKey="label"
          cx="50%"
          cy="50%"
          outerRadius={"250px"}
          fill="#8884d8"
          
          labelLine={false}
          label={renderCustomizedLabel}
          >
            {series[0].data.map((entry, index) => (
              <Cell key={entry.id} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      );
    };
  
    const latestTime = data.reduce((latest, row) => {
      const currentTime = new Date(row[2]);
      return currentTime > latest ? currentTime : latest;
    }, new Date(0));
  
    return (
      <>
      <div className="dev">
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[10]}
        />
        <div className="logData">
          <div className='requestedData'>
            Total number of submitted requests: {data.length}
          </div>
          <div className='requestedData' onClick={notify}>
            Legfrisebb: {latestTime.toISOString()}
          </div>
          <div className='requestedData'>
            Total number of donation to
            <div className='fnameDiv'>
              {foundationName[0]}: {toltalSumFound1}
            </div>
          </div >
          <div className='requestedData'>
          Total number of donation to
            <div className='fnameDiv'> 
              {foundationName[1]}: {toltalSumFound2}
            </div>
          </div>
          <div className='requestedData'>
          Total number of donation to
            <div className='fnameDiv'>
              {foundationName[2]}: {toltalSumFound3}
            </div> 
          </div>
          <div className='requestedData'>
          Total number of donation to
            <div className='fnameDiv'>
              {foundationName[3]}: {toltalSumFound4}
            </div> 
          </div>
        </div>
        <div className='pite'>
          <CustomPieChart
            series={[
              {
                data: pieData,
              },
            ]}
          />
        </div>
        </div>
      </>
  
  )
}
