import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';
import css from 'styled-jsx/css'
import moment from 'moment/moment'
import article_style,{null_style} from './styles/article-styles.js';
import { Helmet } from 'react-helmet';
import Page404 from './Page404.js';
import LazyLoad from 'react-lazyload';
import AdsCard from './AdsCard.js';
import hljs from 'highlightjs'
import {tags_style1,　tags_style2} from './styles/top-styles.js';
import Tags from './top-subcomps/Tags.js'
import { related_list,related_card_style } from './styles/article-styles.js';

class SideContent extends Component{
  constructor(props) {
    super(props);
    this.indexRef = React.createRef();

  }

  clickListener(e) {
    e.preventDefault();
    let nowY = window.pageYOffset;
    const href = e.currentTarget.getAttribute('href');
    const target = document.querySelector(href);
    if( target != null){
      const targetRectTop = target.getBoundingClientRect().top;
      const targetY = targetRectTop + nowY - 50;

      window.scrollTo(0, targetY);
    }
  }
  componentWillUnmount(){
    document.removeEventListener('click',this.clickListener);
  }
  componentDidMount(){
    let links = document.querySelectorAll('a[href^="#"]');
    for(let i = 0; i < links.length; i++){
      links[i].addEventListener('click',this.clickListener);
    }

  }
  render() {
    return(
      <div>
        <h2>目次</h2>
        <div
          className="index"
          dangerouslySetInnerHTML={
            {
              __html: this.props.index
            }
          }
          ref={indexRef => this.indexRef=indexRef}
        />
      </div>
    );
  }
}
class RelatedCard extends Component {
  render() {
    let dt = moment(this.props.pub_date);
    return(
      <article className="card">
        <a href={"/article/"+this.props.id}>
        <div className="card-link-field">
          <div className="card-thumbnail-container">
            <LazyLoad>
              <img className="card-thumbnail" src={this.props.thumbnail} />
            </LazyLoad>
          </div>
          <div className="card-date" >{dt.format("YYYY/MM/DD HH:mm:ss")}</div>
          <div className="card-title">{this.props.title}</div>
        </div>
        </a>
        <style jsx>{related_card_style}</style>
      </article>
    );
  }

}

class RelatedPost extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render(){
    console.log(this.props.list);
    const relatedPostList = this.props.list;
    const items = this.props.list.map(
      (item,index) => <RelatedCard
                        id={item.pk}
                        key={index}
                        title={item.title}
                        thumbnail={item.thumbnailUrl}
                        pub_date={item.pubDate}
                        />
                      )
    return(
      <div>
        <h2>関連記事</h2>
        <div className="related-container">
          {items}
          <style jsx>{related_list}</style>
        </div>
      </div>
    );

  }
}


class Article extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading:false
    }
    this.articleRef = React.createRef();
    this.isInitialized = false;
    this.updateToc = this.updateToc
  }

  lazyLoading(entries) {
    entries.forEach(
    (entry) => {
      if(entry.intersectionRatio != 0) {
        entry.target.src = entry.target.dataset.src;
        this.unobserve(entry.target);
      };
      }
    );
  }
  componentDidUpdate(prev) {
    if(this.articleRef != null && !this.isInitialized ){
      // ドキュメント取得
      const content = document
      // 遅延読み込みのイベントリスな
      const lazyListener = () => {
        let io = new IntersectionObserver(
            this.lazyLoading,
            {
              root: null,
              rootMargin: "0px 0px 0px 0px",
              threshold: [0.05],
            }

        );
        let imgs = content.querySelectorAll('.lazyload');
        for(var i = 0;i < imgs.length;i++) {
          io.observe(imgs[i]);
         }
         content.removeEventListener('scroll',lazyListener);
       }
      // 遅延読み込みのイベント登録
      content.addEventListener('scroll',lazyListener);

      // シンタックスハイライターのイベントリスナ
      const codeListener = () => {
        content.querySelectorAll('pre code').forEach((block) => {
            hljs.highlightBlock(block);
          });
         content.removeEventListener('scroll',codeListener);
      }
      // シンタックスハイライターのイベント登録
      content.addEventListener('scroll',codeListener);

      // 初期化完了フラグ
      this.isInitialized = true;
    }
  }
  componentDidMount(){

    const {params} = this.props.match;
    const pk = params.pk;
    // APIにfetch
    fetch('/spa/1.0/article/'+pk+"/")
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.detail == undefined){
          this.setState({
            loading: true,
            status:true,
            data: responseJson,
          });
          this.props.updateState(
            {
              side: <SideContent
                      index={this.state.data[0].index}
                    />
            });
        } else {
          this.setState({
            loading: true,
            status:false,
          });
        }
      }).catch((error) =>{
        console.log(error)
      });



      return 0;
  }

  render() {
    // もしloading中なら
    if(this.state.loading){
      // 記事が存在する場合
      if(this.state.status){
        // 記事の執筆日時をmomentに変換
        let dt = moment(this.state.data[0].pubDate);
        let title = "nullab |"+this.state.data[0].title;
        let metaContent = this.state.data[0].meta;
        const breadcrumbLink="/?categories=" + this.state.data[0].categoryName;
        return(
          <div className="article-container">
          <Helmet>
            <title>
              { title }
            </title>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/dracula.min.css" />
            <meta name="description" content={metaContent} />
          </Helmet>
            {/*パンクズ表示*/}
            <Link to="/">TOP</Link> > <Link to={breadcrumbLink}>{this.state.data[0].categoryName}</Link>

            {/*タイトル表示*/}
            <div className="article-title">
              { this.state.data[0].title }
            </div>
            {/*タグ表示*/}
            <div className="article-tags">
              <Tags tags={this.state.data[0].tags} />
            </div>
            {/*公開日時表示*/}
            <div className="article-pubDate">
              {dt.format("YYYY/MM/DD HH:mm:ss")}
            </div>
            {/*本文*/}
            <div
              className="article-body"
              dangerouslySetInnerHTML={
              {
                __html: this.state.data[0].body
              }
              }
              ref={articleRef => this.articleRef=articleRef}
            />
            <RelatedPost list={this.state.data[0].relatedPosts}/>
            {/*CSS*/}
            <style jsx>{article_style}</style>
            <AdsCard />
          </div>
        );
      }else{
        // 記事が存在しない場合
        return(
          <div>
            <Page404 />
            <AdsCard />
          </div>
        );
      }
    } else {
      // loading中でなければ
      return(
        <div className="null-field">
          <style jsx>{null_style}</style>
        </div>
      );
    }


  }
}

export default withRouter(Article);
