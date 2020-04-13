import React, { Component } from 'react';
import PropTypes from 'prop-types'
import ReactDOM from "react-dom";
import { withRouter } from 'react-router';
import css from 'styled-jsx/css'
import moment from 'moment/moment'
import { search_style, tags_style1, tags_style2, card_style, top_style} from "../styles/top-styles.js";
import Search from './Search.js';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import queryString from 'query-string'

class Tags extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }

  handleClick(e) {
    let keyword = e.target.textContent;
    let qs = queryString.parse(this.props.location.search)
    let categories = qs.categories ? qs.categories : ""
    window.scrollTo(0, 0);
    this.props.history.push("/?categories="+categories+"&title="+"&tags="+keyword);
  }
  render(){
    let list = this.props.tags.slice()
    const items = list.map(
      (item,index) =>
      <div
        className="tag-item"
        key={index}
        onClick={ this.handleClick }
      >{item.name}
      <style jsx>{tags_style1}</style>
      </div>
    )

    return(
      <div className="tag-field">
        {items}
        <style jsx>{tags_style2}</style>
      </div>
    );
  }
}

export default withRouter(Tags);
