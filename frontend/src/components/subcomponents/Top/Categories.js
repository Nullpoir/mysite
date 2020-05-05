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

const Categories = (props) => {
  const [isLoaded,setIsLoaded] = useState(false)
  const [categories,setCategories] = useState()
  const location = useLocation()
  const history = useHistory()

  useEffect(
    () => {
      // APIを叩きにいく関数
      async function fetchData(){2
        const res = await fetch('/spa/1.0/category/')
        res
          .json()
          .then(
            res => {
              setCategories(res)
              setIsLoaded(true)
            }
          )
          .catch(err => console.log(err))

      }
      fetchData()
    },
    []
  )

  const handleClick = (e) => {
    let keyword = e.target.textContent
    let qs = queryString.parse(location.search)
    let tags = qs.tags ? qs.tags : ""
    let title = qs.title ? qs.title : ""
    history.push("/?categories="+keyword+"&title="+title+"&tags="+tags)
  }

  // 描画
  if(isLoaded){
    let list = categories.results.slice()
    let items = list.map(
      (item,index) =>
      <div
        className="category-item"
        key={index}
        onClick={ handleClick }
      >{item.name}
      </div>
    )

    return(
      <div className="category-field">
        {items}
      </div>
    )
  }else{
    return(
      <div className="category-field">
      </div>
    )
  }
}

export default Categories
