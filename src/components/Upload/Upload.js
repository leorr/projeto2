import React from 'react';

class Upload extends React.Component {

  state= {
    title: "",
    content: "",
  }

  componentDidMount() {
  }

  async uploadPost() {
    const result = JSON.parse(sessionStorage.getItem('token'));
    const token = result.token;
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json')
    myHeaders.append('token', token);
    const myBody = JSON.stringify({title: this.state.title, content: this.state.content});
    const requestOptions = {
      method: 'POST',
      body: myBody,
      headers: myHeaders,
    };
    console.log(myBody);
    const posts = await fetch('https://projeto3-leorr.herokuapp.com/posts/upload', requestOptions)
    .then(function response(response) {
      return response.json();
    }).then(function(data) {
      return data;
    });
    var loading = false;
    if (posts) {
      this.setState( {loading} );
      this.setState({ posts });
    } else {
      loading = true;
      this.setState( {loading} );
      this.setState({ posts });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.uploadPost();
  }

  updateContent(input) {
    var content = input;
    this.setState({content});
  }

  updateTitle(input) {
    var title = input;
    this.setState({title});
  }

  render() {
    if(!this.state.loading) {
      return (
        <div className="dashboard-wrapper">
          <h2>UPLOAD</h2>
          <a href="/projeto2/dashboard">dashboard</a>
          <form onSubmit={this.handleSubmit}>
            <label>title: </label>
            <input initialValue="" onInput={e => this.updateTitle(e.target.value)}/>
            <label>content: </label>
            <input initialValue="" onInput={e => this.updateContent(e.target.value)}/>
            <button onClick={this.handleSubmit}>Publicar</button>
          </form>
          <form onSubmit={this.logout}>
            <button type="submit">Logout</button>
          </form>
        </div>
      )
    }
  }
}

export default Upload;