import React, {Component} from 'react';
import axios from 'axios';

class App extends Component {

  state = {
    weather: []
  }

  async getData() {
    await axios.get(`http://ladataverte.fr/api/1.0/data_points?id_indicators[]=10&type_place[]=world&from=2010-01-01&to=2010-12-31`)
    .then( res => {
      const weather = res.data;
      //set state format data weather csv -> json
      this.setState({ weather });
    })
  }

  componentDidMount() {
    this.getData();
    //plot data
  }

  render () {
    return (
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Projeto 2, segue abaixo dados do clima do mundo no mundo em 2010 sem formatação.</h5>
          <h6 class="card-subtitle mb-2 text-muted">{this.state.weather}</h6>
        </div>
      </div>
    );
  }
}

export default App;
