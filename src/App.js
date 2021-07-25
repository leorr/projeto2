import React, { Component } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

import { csvJSON } from './utils/CsvUtils'

class App extends Component {

  state = {
    weathers: [],
    sumTemp: [],
    years: [2000, 2005, 2010],
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
          .flatMap(value => parseFloat(value));
          this.state.sumTemp.push(weather.reduce((a, b) => a + b, 0))
          weathers.push(weather.flatMap(value => ({ [year]: value })));
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
  }

  render() {
    if(!this.state.loading) {
      const data = this.state.weathers;
      var arr = [];
      for (let index = 0; index < 12; index++) {
        const test = [
          {'2000':data[0][index][2000],'2005':data[1][index][2005],'2010':data[2][index][2010]}
        ];
        arr.push(test);
      }
      var finalarr = [].concat.apply([], arr)
      return (
        <div>
          Dados da média de temperatura global (Celsius) por ano, recuperados da api <a href="http://ladataverte.fr">ladataverte</a>
          <LineChart
          width={600}
          height={600}
          data={finalarr}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          tittle=""
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Line
          type='monotone'
          dataKey='2000'
          stroke='#8884d8'
          fill='#8884d8'
          name='2000'
          />
          <Line
          type='monotone'
          dataKey='2005'
          stroke='#fff000'
          fill='#fff000'
          />
          <Line
          type='monotone'
          dataKey='2010'
          stroke='#ff0000'
          fill='#ff0000'
          />
          <Tooltip />
        </LineChart>
        A soma das médias de temperatura por ano<br/> <br/>
        2000: {this.state.sumTemp[0]} <br/>
        2005: {this.state.sumTemp[1]} <br/>
        2010: {this.state.sumTemp[2]} <br/>
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
