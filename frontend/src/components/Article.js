import React, { useState,useEffect } from 'react'
import ReactDOM from "react-dom"
import PropTypes from 'prop-types'
import {
  Link,
  useParams,
  useHistory,
  useLocation,
} from 'react-router-dom'
import moment from 'moment/moment'
import { Helmet } from 'react-helmet'
import hljs from 'highlightjs'
import Tags from './subcomponents/Top/Tags.js'
import Page404 from './Page404.js'
import './stylus/article.styl'
import AdsCard from './AdsCard.js'
import LazyLoad from 'react-lazyload';


const Article = (props) => {
  const {pk} = useParams()
  const [isLoaded,setIsLoaded] = useState(false)
  const [data,setData] = useState()
  const [status,setStatus] = useState(false)
  const [loadContent,setLoadContent] = useState(false)

  useEffect(
    () => {
      async function fetchData(){
        const res = await fetch('/spa/1.0/article/'+pk+'/')
        res
          .json()
          .then(
            res => {
              if(res.detail == undefined){
                setStatus(true)
              }
              setData(res)
              setIsLoaded(true)
            }
          )
          .catch(err => console.log(err))
      }
      fetchData()
    },
    []
  )

  useEffect(
    () => {
      async function fetchData() {
        const res = await fetch('/spa/1.0/article/' + pk + '/')
        res
          .json()
          .then(
            res => {
              if (res.detail == undefined) {
                setStatus(true)
              }
              setData(res)
              setIsLoaded(true)
            }
          )
          .catch(err => console.log(err))
      }
      fetchData()
    },
    [pk]
  )

  useEffect(
    () => {
      if(!loadContent && isLoaded){
        // サイドバー設定
        props.setSideContent((<SideContent content={data[0].index} />))
        setLoadContent(true)

        // 遅延読み込みやシンタックスハイライト実装
        const content = document
        // 遅延読み込みのイベントリスな
        const lazyListener = () => {
          let io = new IntersectionObserver(
              (entries) => {
                entries.forEach(
                (entry) => {
                    if(entry.intersectionRatio != 0) {
                      entry.target.src = entry.target.dataset.src;
                      io.unobserve(entry.target);
                    }
                  }
                )
              },
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
      }
    },
    [isLoaded]
  )

  if(isLoaded){
    if(status){
      let dt = moment(data[0].pubDate)
      let title = "nullab | " + data[0].title
      let metaContent = data[0].meta
      const breadcrumbLink = "/?categories=" + data[0].categoryName
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
          <Link to="/">TOP</Link> > <Link to={breadcrumbLink}>{data[0].categoryName}</Link>
          {/*タイトル表示*/}
          <div className="article-title">
            { data[0].title }
          </div>
          {/*タグ表示*/}
          <div className="article-tags">
            <Tags tags={data[0].tags} />
          </div>
          {/*公開日時表示*/}
          <div className="article-pubDate">
            {dt.format("YYYY/MM/DD HH:mm:ss")}
          </div>
          <div
            className="article-body"
            dangerouslySetInnerHTML={
              {
                __html: data[0].body
              }
            }
          />
        <RelatedPost list={data[0].relatedPosts} />
        <AdsCard />
        </div>
      )
    } else {
      return(
        <div>
          <Page404 />
        </div>
      )
    }
  } else {
    return(
      <div>
        Loading
      </div>
    )
  }
}

export default Article

const SideContent = (props) => {
  const clickListener = (e) => {
    e.preventDefault()
    let nowY = window.pageYOffset
    const href = e.currentTarget.getAttribute('href')
    const target = document.querySelector(href)
    if( target != null){
      const targetRectTop = target.getBoundingClientRect().top
      const targetY = targetRectTop + nowY - 50

      window.scrollTo(0, targetY)
    }
  }

  useEffect(
    () => {
      let links = document.querySelectorAll('a[href^="#"]')
      for(let i = 0; i < links.length; i++){
        links[i].addEventListener('click',clickListener)
      }

      return () => document.removeEventListener('click',clickListener)
    }
  )

  const content = (
    <div>
      <h2>目次</h2>
      <div
        className="index"
        dangerouslySetInnerHTML={
          {
            __html: props.content
          }
        }
      />
    </div>
  )
  return(content)
}

const RelatedCard = (props) => {
  let dt = moment(props.pub_date);

  return (
    <article className="card">
      <Link to={"/article/" + props.id}>
        <div className="card-link-field">
          <div className="card-thumbnail-container">
            <LazyLoad>
              <img className="card-thumbnail" src={props.thumbnail} />
            </LazyLoad>
          </div>
          <div className="card-date" >{dt.format("YYYY/MM/DD HH:mm:ss")}</div>
          <div className="card-title">{props.title}</div>
        </div>
      </Link>

    </article>
  );

}

const RelatedPost = (props) => {
  console.log(props.list);
  const relatedPostList = props.list;
  const items = props.list.map(
    (item, index) => <RelatedCard
      id={item.pk}
      key={index}
      title={item.title}
      thumbnail={item.thumbnailUrl}
      pub_date={item.pubDate}
    />
  )
  return (
    <div>
      <h2>関連記事</h2>
      <div className="related-container">
        {items}
      </div>
    </div>
  );

  
}
