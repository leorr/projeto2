import React from 'react';

class Dashboard extends React.Component {

  state= {
    posts: [],
    loading: true,
    searchString: "",
  }

  async fetchPosts(searchString) {
    const result = JSON.parse(sessionStorage.getItem('token'));
    const token = result.token;
    const myHeaders = new Headers();
    myHeaders.append('token', token);
    myHeaders.append('searchString', searchString);
    const posts = await fetch('https://projeto3-leorr.herokuapp.com/posts/search', {
      method: 'GET',
      headers: myHeaders,
    },
    ).then(function response(response) {
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

  componentDidMount() {
  }

  logout() {
    window.onunload = function () {
      sessionStorage.removeItem('token');
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state.searchString);
    this.fetchPosts(this.state.searchString);
  }

  updateSearch(input) {
    var searchString = input;
    this.setState({searchString});
  }

  render() {
    const {posts} = this.state;
    if(!this.state.loading) {
      return(
        <div className="dashboard-wrapper">
          <h2>Dashboard</h2>
          <a href="/projeto2/upload">UPLOAD</a>
          <h1>Posts</h1>
          <form onSubmit={this.handleSubmit}>
            <label>Busca: </label>
            <input initialValue="" onInput={e => this.updateSearch(e.target.value)}/>
            <button onClick={this.handleSubmit}>Busca</button>
          </form>
          {posts.map(post => 
          <div>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
          </div>
          )}
          <form onSubmit={this.logout}>
            <button type="submit">Logout</button>
          </form>
        </div>
      );
    } else {
      return (
        <div className="dashboard-wrapper">
          <h2>Dashboard</h2>
          <a href="/projeto2/upload">UPLOAD</a>
          <h1>Posts</h1>
          <form onSubmit={this.handleSubmit}>
            <label>Busca: </label>
            <input initialValue="" onInput={e => this.updateSearch(e.target.value)}/>
            <button onClick={this.handleSubmit}>Busca</button>
          </form>
          <form onSubmit={this.logout}>
            <button type="submit">Logout</button>
          </form>
        </div>
      )
    }
    
  }
}

export default Dashboard;