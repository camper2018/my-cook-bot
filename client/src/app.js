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
        Welcome To Your Cook Bot
      </div>
    );
  }
}
ReactDom.render(<App/>, document.getElementById('app'));
