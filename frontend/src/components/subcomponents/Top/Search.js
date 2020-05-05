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


const Search = () => {
  const history = useHistory()
  const location = useLocation()
  const [value,setValue] = useState("")

  const handleChange = (e)=> {
    setValue(e.target.value)
  }

  const handleSubmit = (e)=> {
    e.preventDefault()
    let keyword = value
    let qs = queryString.parse(location.search)
    let categories = qs.categories ? qs.categories : ""
    history.push("/?categories="+categories+"&title="+keyword+"&tags=")
  }

  return(
    <div className="search-container">
      <form onSubmit={handleSubmit}>
        <input
          className="search-box"
          type="text"
          name="keyword"
          placeholder="キーワードで探す"
          value={value}
          onChange={handleChange}
         />
      </form>
    </div>
  )
}

export default Search
