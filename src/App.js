import React, { Component } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';

import { csvJSON } from './utils/CsvUtils'

class App extends Component {

  state = {
    weathers: [],
    years: [2005, 2006, 2007, 2008, 2009, 2010, 2011],
    loading: true,
    error: false,
  };

  async getData(years) {
    var weathers = [];
    this.state.loading = true;
    var count = 0;
    for (const year of years) {
      try {
        await axios.get(`http://ladataverte.fr/api/1.0/data_points?id_indicators[]=10&type_place[]=world&from=${year}-01-01&to=${year}-12-31`)
        .then(res => {
          const csvString = res.data;
          const weather = csvJSON(csvString)
          .map(value => value[2])
          .filter(function (element) { return element !== undefined; })
          .flatMap(value => ({ [year]: parseFloat(value) }));
          weathers.push(weather);
        });
      } catch (error) {
        this.setState({ error: true });
      } finally {
        count++;
        if(count >= years.length) {
          this.state.loading = false;
          this.setState({ weathers });
        }
      }
    }
  }
  
  componentDidMount() {
    this.getData(this.state.years);
    //plot data
  }

  render() {
    if(!this.state.loading) {
      const data = [].concat.apply([],this.state.weathers);
      console.log(data);
      return (
        <div>
          <LineChart
          width={600}
          height={400}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Line
          type='monotone'
          dataKey='2005'
          stroke='#8884d8'
          fill='#8884d8'
          />
          <Line
          type='monotone'
          dataKey='2006'
          stroke='#8884d8'
          fill='#8884d8'
          />
          <Line
          type='monotone'
          dataKey='2007'
          stroke='#8884d8'
          fill='#8884d8'
          />
          <Line
          type='monotone'
          dataKey='2008'
          stroke='#8884d8'
          fill='#8884d8'
          />
          <Line
          type='monotone'
          dataKey='2009'
          stroke='#8884d8'
          fill='#8884d8'
          />
          <Line
          type='monotone'
          dataKey='2010'
          stroke='#8884d8'
          fill='#8884d8'
          />
          <Line
          type='monotone'
          dataKey='2011'
          stroke='#8884d8'
          fill='#8884d8'
          />
          <Tooltip />
        </LineChart>
        </div>
      );
    } else {
      return (
        <div>Loading</div>
      )
    }
  }
}

export default App;
