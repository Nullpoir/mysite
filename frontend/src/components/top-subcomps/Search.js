import React, { Component } from 'react';
import PropTypes from 'prop-types'
import ReactDOM from "react-dom";
import { withRouter } from 'react-router';
import css from 'styled-jsx/css'
import moment from 'moment/moment'
import { search_style, tags_style1, tags_style2, card_style, top_style} from "../styles/top-styles.js";
import queryString from 'query-string'

import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

class Search extends Component {

  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState(
      {
        value: event.target.value,
      }
    );
  }
  handleSubmit(event) {
    event.preventDefault();
    let keyword = this.state.value;
    let qs = queryString.parse(this.props.location.search)
    let categories = qs.categories ? qs.categories : ""
    this.props.history.push("/?categories="+categories+"&title="+keyword+"&tags=");
  }


  render() {
    return(
      <div className="search-container">
        <form onSubmit={this.handleSubmit}>
          <input
            className="search-box"
            type="text"
            name="keyword"
            placeholder="キーワードで探す"
            value={this.state.value}
            onChange={this.handleChange}
           />
        </form>
        <style jsx>{search_style}</style>
      </div>
    );
  }
}

export default withRouter(Search);
