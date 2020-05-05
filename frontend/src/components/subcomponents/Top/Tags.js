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

const Tags = (props) => {
  // ステート定義
  const location = useLocation()
  const history = useHistory()

  const handleClick = (e) => {
    let keyword = e.target.textContent;
    let qs = queryString.parse(location.search)
    let categories = qs.categories ? qs.categories : ""
    window.scrollTo(0, 0);
    history.push("/?categories="+categories+"&title="+"&tags="+keyword);
  }

  // 描画
  let list = props.tags.slice()
  const items = list.map(
    (item,index) =>
    <div
      className="tag-item"
      key={index}
      onClick={ handleClick }
    >{item.name}
    </div>
  )

  return(
    <div className="tag-field">
      {items}
    </div>
  );
}

export default Tags
