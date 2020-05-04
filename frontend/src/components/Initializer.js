import React, { useState,useEffect } from 'react'
import ReactGA from 'react-ga';
import {
  useParams,
  useHistory,
  useLocation,
} from 'react-router-dom';

const Initializer = (props) => {
  const location = useLocation()
  // マウント時だけ実行
  useEffect(
    function initialize() {
      ReactGA.initialize('UA-134690918-1')
    },
    []
  )
  useEffect(
    function setGA() {
      // 画面遷移の旅に実行
      window.scrollTo(0, 0)
      ReactGA.set({ page: location.pathname })
      ReactGA.pageview(location.pathname)
    }
  )

  return(props.children)

}

export default Initializer
