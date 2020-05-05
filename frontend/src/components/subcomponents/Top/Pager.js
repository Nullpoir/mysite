import React, { useState,useEffect } from 'react'
import ReactDOM from "react-dom"
import PropTypes from 'prop-types'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  useParams,
  useHistory,
  useLocation,
} from 'react-router-dom'
import queryString from 'query-string'

const Pager = (props) => {
  // 文言
  const prevSign = "Prev"
  const nextSign = "Next"

  // ステート定義
  const location = useLocation()
  const history = useHistory()

  const handleClick = (e) =>{
    // 変数宣言
    let keyword = e.target.textContent;
    let query = location.search;
    let qs = queryString.parse(location.search);
    let url;
    // まず中身のキーワードをみてどのキーが押されたかチェック。
    // 次にクエリがあるパターン、クエリはあるし、前に指定したpageがあるパターン
    // クエリはあるけど、pageが初めて入るパターンの3つにわけ処理
    if(keyword == nextSign){

      if (query == ""){
        url = "?page="+props.next;
      } else if( (qs.page !== undefined) && (query != "")){
        url = query.replace(
          "page="+props.current,
          "page="+props.next
        );
      } else if((qs.page === undefined) && (query != "")){
        url = query+"&page="+props.next;
      }
    } else if(keyword == prevSign){
      if (query == ""){
        url = "?page="+props.prev;
      } else if( (qs.page !== undefined) && (query != "")){
        url = query.replace(
          "page="+props.current,
          "page="+props.prev
        );
      } else if((qs.page === undefined) && (query != "")){
        url = query+"&page="+props.prev;
      }
    } else if(parseInt(keyword) != NaN){
      let prevUrl = url;
      url = query.replace(
        "page="+props.current,
        "page="+keyword
      );
      if(prevUrl == url){
        url = url + "page=" + keyword;
      }
    }
    // URL切り替え
    window.scrollTo(0, 0);
    history.push("/"+url);
    return 0;
  }

  return(
    <div className="pager-container">
        {
          props.prev ?(
            <div className="pager-button prev" onClick={handleClick}>
              {prevSign}
            </div>
          ) : (null)
        }
        <div className="current">
          { props.current }
        </div>
        ・・・
        {
          props.current != props.last ?(
            <div className="last" onClick={handleClick}>
              { props.last }
            </div>
          ) : (null)
        }
        {
          props.next ?(
            <div className="pager-button next" onClick={handleClick}>
              {nextSign}
            </div>
          ) : (null)
        }

    </div>
  )
}
export default Pager
