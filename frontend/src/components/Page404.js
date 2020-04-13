import React, { Component } from 'react';
import ReactDOM from "react-dom";
import PropTypes from 'prop-types'
import { withRouter } from 'react-router';
import AdsCard from './AdsCard.js'
import { Helmet } from 'react-helmet';
import main_style from "./styles/page404-styles.js"

export default class Page404 extends Component {
  render(){
    return(
      <div>
        <Helmet>
          <title>
            nullab | お探しのページは存在しません。
          </title>
        </Helmet>

        <div className="page-404">
          お探しのページは存在しません。
        </div>
        <style jsx>{main_style}</style>
      </div>
    );
  }
}
