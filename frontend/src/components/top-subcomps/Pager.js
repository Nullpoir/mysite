import React, { Component } from 'react';
import ReactDOM from "react-dom";
import PropTypes from 'prop-types'
import { withRouter } from 'react-router';
import css from 'styled-jsx/css'
import {pager_style} from "../styles/top-styles.js";
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import queryString from 'query-string';

class Pager extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      prevSign: "prev",
      nextSign: "next"
    }
  }

  handleClick(e) {
    // 変数宣言
    let keyword = e.target.textContent;
    let query = this.props.location.search;
    let qs = queryString.parse(this.props.location.search);
    let url;
    // まず中身のキーワードをみてどのキーが押されたかチェック。
    // 次にクエリがあるパターン、クエリはあるし、前に指定したpageがあるパターン
    // クエリはあるけど、pageが初めて入るパターンの3つにわけ処理
    if(keyword == this.state.nextSign){

      if (query == ""){
        url = "?page="+this.props.next;
      } else if( (qs.page !== undefined) && (query != "")){
        url = query.replace(
          "page="+this.props.current,
          "page="+this.props.next
        );
      } else if((qs.page === undefined) && (query != "")){
        url = query+"&page="+this.props.next;
      }
    } else if(keyword == this.state.prevSign){
      if (query == ""){
        url = "?page="+this.props.prev;
      } else if( (qs.page !== undefined) && (query != "")){
        url = query.replace(
          "page="+this.props.current,
          "page="+this.props.prev
        );
      } else if((qs.page === undefined) && (query != "")){
        url = query+"&page="+this.props.prev;
      }
    } else if(parseInt(keyword) != NaN){
      let prevUrl = url;
      url = query.replace(
        "page="+this.props.current,
        "page="+keyword
      );
      if(prevUrl == url){
        url = url + "page=" + keyword;
      }
    }
    // URL切り替え
    window.scrollTo(0, 0);
    this.props.history.push("/"+url);
    return 0;
  }

  render() {
    return(
      <div className="pager-container">
          {
            this.props.prev ?(
              <div className="pager-button prev" onClick={this.handleClick}>
                {this.state.prevSign}
              </div>
            ) : (null)
          }
          <div className="current">
            { this.props.current }
          </div>
          ・・・
          {
            this.props.current != this.props.last ?(
              <div className="last" onClick={this.handleClick}>
                { this.props.last }
              </div>
            ) : (null)
          }
          {
            this.props.next ?(
              <div className="pager-button next" onClick={this.handleClick}>
                {this.state.nextSign}
              </div>
            ) : (null)
          }

        <style jsx>{ pager_style }</style>
      </div>

    );
  }
}

export default withRouter(Pager);
