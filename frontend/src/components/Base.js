import React, { useState,useEffect } from 'react'
import ReactDOM from "react-dom"
import PropTypes from 'prop-types'
import Top from './Top.js'
import Initializer from './Initializer.js'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useParams,
  useHistory,
  useLocation,
} from 'react-router-dom';
import './stylus/base.styl'

const Base = () => {
  // ステート定義
  const [isToggle,setIsToggle] = useState(false)
  const [isActive,setIsActive] = useState(window.innerWidth <= 800)
  const [sideContent,setSideContent] = useState("")

  // リサイズで再度コンテンツの表示制御
  const resize = () => {
    if(window.innerWidth <= 800){
      setIsToggle(false)
      setIsActive(false)
    } else {
      setIsToggle(true)
      setIsActive(true)
    }
  }

  // マウンド時とアンマウント時の処理
  useEffect(
    function initializer(){
      window.addEventListener("resize", resize);
      return (
        () => {
          window.removeEventListener("resize", resize);
        }
      )
    }
  )

  // 描画
  return (
    <div id="root">
      <Router>
        <Initializer>
            <div id="content">
              <div id="main-content">
                <Switch>
                  <Route path="/" exact>
                    <Top />
                  </Route>
                </Switch>
              </div>
            </div>
        </Initializer>
      </Router>
    </div>
  )
}

export default Base
ReactDOM.render(<Base />, document.getElementById("App"))
