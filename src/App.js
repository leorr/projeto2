import React, {Component} from 'react';

class App extends Component {
  state = {
    weather: []
  }
  componentDidMount() {
    fetch('http://ladataverte.fr/api/1.0/data_points?id_indicators[]=10&type_place[]=world&from=2010b-01-01&to=2010-12-31')
    .then(res => res.json())
    .then((data) => {
      this.setState({ weather: data })
    })
  }
  render () {
    return (
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Projeto 2</h5>
          <h6 class="card-subtitle mb-2 text-muted">teste deploy</h6>
          <p class="card-text">Commit inicial</p>
        </div>
      </div>
      );
    }
  }
export default App;
