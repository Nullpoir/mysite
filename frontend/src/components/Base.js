import React from "react";
import ReactDOM from "react-dom";
import Top from './Top.js';
import Article from './Article.js';
import Inquiry from './Inquiry.js';
import Privacy from './Privacy.js';
import AdsCard from './AdsCard.js';
import Page404 from './Page404.js';
import Initializer from './Initializer.js';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import css from 'styled-jsx/css';
import {side_style,side_popup_style,btn_style} from "./styles/base.js";


class NavButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen:false
    };
  };


  clickHandler(e) {
    let state = this.state.isOpen;
    this.setState({isOpen: !state});
    this.props.updateState(
      {
        isActive: !this.props.isActive
      }
    );
  }

  barClass(state){
    if(state){
      return "menu-bars isOpen"
    } else {
      return "menu-bars"
    }
  }
  render() {
    let menuClass = this.barClass(this.state.isOpen);
    return (
      <div className="nav-button" onClick={() => this.clickHandler()}>
        <span className={menuClass}></span>
        <span className={menuClass}></span>
        <style jsx>{btn_style}</style>
      </div>
    );
  }

}

class Header extends React.Component {

  render() {
    if(this.props.isToggle){
      return (
        <div>
          <header id="header">
            <Link to="/?categories=&title=&tags=" className="header__title">
              Nullab
            </Link>
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
              <NavButton isActive={this.props.isActive} updateState={this.props.updateState} />
            </header>
          </div>
          );
      }

  }

}

class Footer extends React.Component {
  render() {
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
    );
  }

}

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  };

  render() {
    if(!this.props.isActive){
      return(
        <div>
        <div
          className="side"
          dangerouslySetInnerHTML = {
            {
              __html:this.props.content
            }
          }
         />
          <style jsx>{side_style}</style>
        </div>
      )
    } else {
      const sideContent = this.props.content;
      return(
        <div>
        <div
          className="side"
         >{sideContent}</div>
          <style jsx>{side_popup_style}</style>
        </div>
      )
    }
  };
}

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggle: false,
      isActive: window.innerWidth <= 800,
      side: "",
    };
    this.updateState = this.updateState.bind(this);
  };
  updateState(state) {
    this.setState(state);
  }

  componentDidMount() {
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
  }

  componentWillUnMount() {
    window.removeEventListener("resize", this.resize.bind(this));
  }

  resize() {
    if(window.innerWidth <= 800){
      this.setState(
        {
          isActive: false,
          isToggle: false,
        }
      );
    } else {
      this.setState(
        {
          isActive: true,
          isToggle: true,
        }
      );
    }
  }
  render() {
    return (
      <div id="root">
        <Router>
          <Initializer>
            <Header isToggle={this.state.isToggle} isActive={this.state.isActive} updateState={this.updateState}/>
              <div id="content">
                <div id="main-content">
                  <Switch>
                    <Route exact path="/" render={(props) => <Top updateState={this.updateState}/>} />
                    <Route exact path="/article/:pk" render={(props) => <Article updateState={this.updateState}/>}/>
                    <Route exact path="/inquiry" component={Inquiry} />
                    <Route exact path="/privacy" component={Privacy} />
                    <Route component={Page404} />
                  </Switch>
                  <Footer />
                </div>
                <Sidebar content={this.state.side} isActive={this.state.isActive}/>
              </div>
          </Initializer>
        </Router>
      </div>
    );
  }

}



export default Base;
ReactDOM.render(<Base />, document.getElementById("App"));
