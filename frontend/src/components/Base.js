import React, { useState,useEffect } from 'react'
import ReactDOM from "react-dom"
import PropTypes from 'prop-types'
import Top from './Top.js'
import Initializer from './Initializer.js'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  useParams,
  useHistory,
  useLocation,
} from 'react-router-dom';
import './stylus/base.styl'

const Base = () => {
  // ステート定義
  const [toggle,setToggle] = useState(false)
  const [isActive,setIsActive] = useState(!(window.innerWidth <= 800))
  const [isOpened,setIsOpened] = useState(!(window.innerWidth <= 800))
  const [sideContent,setSideContent] = useState("hoge")

  // リサイズで再度コンテンツの表示制御
  const resize = () => {
    setToggle(false)
    setIsActive(window.innerWidth <= 800)
    setIsOpened(!(window.innerWidth <= 800))
  }

  // mount時とunmount時の処理
  useEffect(
    function initializer(){
      window.addEventListener("resize", resize);
      return (
        () => {
          window.removeEventListener("resize", resize);
        }
      )
    },
    []
  )

  // 描画
  return (
    <div id="root">
      <Router>
        <Initializer>
          <Header isActive={isActive} toggle={toggle} setToggle={setToggle} isOpened={isOpened} setIsOpened={setIsOpened}/>
          <div id="content">
            <div id="main-content">
              <Switch>
                <Route path="/" exact>
                  <Top setSideContent={setSideContent}/>
                </Route>
              </Switch>
              <Footer/>
            </div>
          <Sidebar content={sideContent} isOpened={isOpened} />
          </div>
        </Initializer>
      </Router>
    </div>
  )
}

// ヘッダーのコンポーネント
const Header = (props) => {
  if(props.isActive){
    return (
      <div>
        <header id="header">
          <Link to="/?categories=&title=&tags=" className="header__title">
            Nullab
          </Link>
          <NavButton toggle={props.toggle} setToggle={props.setToggle} isOpened={props.isOpened} setIsOpened={props.setIsOpened}/>
        </header>
      </div>
      );
    } else {
      return (
        <div>
          <header id="header">
            <Link to="/?categories=&title=&tags=" className="header__title">
              Nullab
            </Link>
          </header>
        </div>
        );
    }
}

// ボタン
const NavButton = (props) => {
  function barClass(state){
    if(state){
      return "menu-bars is-active"
    } else {
      return "menu-bars"
    }
  }

  let menuClass = barClass(props.toggle)
  const handleClick = () =>{
    props.setToggle(!(props.toggle))
    props.setIsOpened(!(props.isOpened))
  }

  return (
    <div className="nav-button" onClick={handleClick}>
      <span className={menuClass}></span>
      <span className={menuClass}></span>
    </div>
  )
}

// フッター
const Footer = () => {
    return (
      <div>
        <footer id="footer">
          <div className="link-field">
            <a href="https://github.com/nullpoir">
              GitHub
            </a>
            &nbsp;&nbsp;
            <a href="https://twitter.com/nullpoir">
              Twitter
            </a>
            &nbsp;&nbsp;
            <Link to="/inquiry">
              Inquiry
            </Link>
            &nbsp;&nbsp;
            <Link to="/privacy">
              PrivacyPolicy
            </Link>
          </div>
          <div className="copyright">
            Copyright Nullab Since 2019.2
          </div>
        </footer>
      </div>
    )
}

// サイドバー
const Sidebar = (props) => {

  function sideBarClass(state){
    if(state){
      return "side is-opened"
    } else {
      return "side"
    }
  }

  let myClass = sideBarClass(props.isOpened)

  return(
    <div
      className={myClass}
     >{props.content}</div>
  )

}

export default Base
ReactDOM.render(<Base />, document.getElementById("App"))
