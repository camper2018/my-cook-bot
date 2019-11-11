import React, {Component} from 'react';
import ReactDom from 'react-dom';
import $ from 'jquery';

class App extends Component {
  constructor(props) {
    super(props);

  }
  render() {
    return (
      <div>
        Welcome
      </div>
    );
  }
}
ReactDom.render(<App/>, document.getElementById('app'));