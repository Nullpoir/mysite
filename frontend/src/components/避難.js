
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



import React, { Component } from 'react';
import ReactDOM from "react-dom";
import PropTypes from 'prop-types'
import { withRouter } from 'react-router';
import css from 'styled-jsx/css'
import moment from 'moment/moment'
import queryString from 'query-string'
import {
  search_style, tags_style1,
  tags_style2, card_style,
  list_style, pager_style,
  null_style
} from "./styles/top-styles.js";
import Pager from './top-subcomps/Pager.js';
import Search from './top-subcomps/Search.js';
import Tags from './top-subcomps/Tags.js'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import { Helmet } from 'react-helmet';
import Categories from './top-subcomps/Categories.js';
import AdsCard from './AdsCard.js';
import LazyLoad from 'react-lazyload';

class ArticleList extends Component {
  constructor(props) {
    super(props);
  };
  render(){
    const items = this.props.list.map(
      (item,index) => <Card
                        id={item.pk}
                        key = {index}
                        title = {item.title}
                        thumbnail = {item.thumbnailUrl}
                        pub_date = {item.pubDate}
                        tags = {item.tags}
                        />
                      )
    return(
      <div className="card-container">
        {items}
        <style jsx>{list_style}</style>
      </div>
    )
  }
}
class Card extends Component {
  render() {
    let dt = moment(this.props.pub_date);
    return(
      <article className="card">
        <Link to={"/article/"+this.props.id}>
        <div className="card-link-field">
          <div className="card-thumbnail-container">
            <LazyLoad>
              <img className="card-thumbnail" src={this.props.thumbnail} />
            </LazyLoad>
          </div>
          <div className="card-date" >{dt.format("YYYY/MM/DD HH:mm:ss")}</div>
          <div className="card-title">{this.props.title}</div>
        </div>
        </Link>

        {
          this.props.tags != undefined &&
            <div className="card-lower">
              <Tags tags={this.props.tags} />
            </div>
        }

        <style jsx>{card_style}</style>
      </article>
    );
  }

}

class SideContent extends Component{

  render() {
    const content = (
      <div>
        <h2>自己紹介</h2>
        名前：ぬるぽいんた<br/>
        自称フルスタックエンジニア＆スローループマイスター<br/>
      </div>
    );
    return(content);
  }
}

class Top extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded:false,
      query: "null",
      category: "トップ"
    };
  };

  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }

  componentDidUpdate(prevProps,prevState) {
    if (this.props.location.search !== prevProps.location.search){
      let query = this.props.location.search;
      let qs = queryString.parse(query)
      let category = qs.categories ? qs.categories : "トップ"
      if(category == undefined){category="トップ"}
      this.setState({helmetTitle: category})

      return fetch('/spa/1.0/article/?field=body&field=related_posts&field=meta&'+query.slice(1))
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({
            loaded: true,
            data: responseJson,
          });
        })
        .catch((error) =>{
          console.error(error);
        });
      }
  };
  componentDidMount(){
    this.setState({
      loaded:false,
      helmetTitle: "トップ"
    });
    this.props.updateState({side: <SideContent />});
    let query = this.props.location.search;
    fetch('/spa/1.0/article/?field=body&field=index&field=meta&'+query.slice(1))
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          loaded: true,
          data: responseJson,
        });
      })
      .catch((error) =>{
        console.error(error);
      });
      return 0;
  };

  render() {
    const { match, location, history } = this.props;
    if(this.state.loaded){
      let list = this.state.data.results.slice();
      let tString = "nullab | "+ this.state.helmetTitle
        return(
          <div className="content-root">
            <Helmet
              title={tString}
              meta={[
                {name:"description",content:"自称フルスタックエンジニアが運営するブログ"}
              ]}
            />
            <Categories />
            {/*  検索 */}
            <Search />
            {/*リスト表示 */}
            <ArticleList list={list} />
            <Pager
              current={this.state.data.current}
              next={this.state.data.next}
              prev={this.state.data.previous}
              last={this.state.data.last}
              />
              <AdsCard />
          </div>
        );
      } else {
          return(
            <div className="null-field">
              <Helmet>
                <title>
                  nullab | トップ
                </title>
              </Helmet>
            </div>
          );
      }
    }

}
export default withRouter(Top);
