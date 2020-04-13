import React, { Component } from 'react';
import PropTypes from 'prop-types'
import ReactDOM from "react-dom";
import { withRouter } from 'react-router';
import css from 'styled-jsx/css'
import moment from 'moment/moment'
import {category_style1,category_style2} from "../styles/top-styles.js";
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import queryString from 'query-string'

class Categories extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      loaded: false,
      categories: null,
    };
  }

  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }
  componentDidMount() {
    return fetch('/spa/1.0/category/')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          loaded: true,
          categories: responseJson
        });
      })
      .catch((error) =>{
        console.error(error);
      });
  }

  handleClick(e) {
    let keyword = e.target.textContent;
    let qs = queryString.parse(this.props.location.search)
    let tags = qs.tags ? qs.tags : ""
    let title = qs.title ? qs.title : ""
    this.props.history.push("/?categories="+keyword+"&title="+title+"&tags="+tags);
  }
  render() {
    if(this.state.loaded){
      let list = this.state.categories.results.slice();
      const items = list.map(
        (item,index) =>
        <div
          className="category-item"
          key={index}
          onClick={ this.handleClick }
        >{item.name}
        <style jsx>{category_style1}</style>
        </div>
      )

      return(
        <div className="category-field">
          {items}
          <style jsx>{category_style2}</style>
        </div>
      );
    }else{
      return(
        <div className="category-field">

        </div>
      );
    }
  }
}

export default withRouter(Categories);
