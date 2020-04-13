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
