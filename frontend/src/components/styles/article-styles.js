import css from 'styled-jsx/css';

const article_style = css`
  .article-title{
    font-weight:bold;
    font-size:3rem;
    margin:10px 0;
    letter-spacing:0;
    text-align:left;
  }
  .article-pubDate{
    text-align: left;
    color: #888;
  }
  .article-tags{
    margin: 10px 0;
  }
`
export const related_list = css`
  .related-container {
    overflow-x:scroll;
    display: flex;
    flex-wrap:nowrap;
    width:100%;
  }
  .related-container::-webkit-scrollbar{
    width: 10px;
    height: 10px;
  }
  .related-container::-webkit-scrollbar-track{
    background: #eef;
  }
  .related-container::-webkit-scrollbar-thumb {
    background: #54D2FA;
  }
  .intro-field{
    font-size:1.2rem;
  }
  @media screen and (max-width:800px) {
    .related-container {
      padding:0;
    }
  }
`

export const null_style = css`
  .null-field{
    height:99vh;
    display:block;
    background:white;
  }
`

export const related_card_style = css`

.card{
  box-shadow: 0px 0px 1px 1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12);
  margin-right: 20px;
  margin-bottom: 20px;
  border-radius: 1px;
  flex: 0 0 auto;
  width: calc((100% - 44px) / 3);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom:10px;
}
.card-link-field{

}
.card-thumbnail-container{
  margin: 0;
  overflow: hidden;
  position: relative;
  height: 0;
  padding-bottom: 60%;
}
.card-thumbnail{
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

}
.card-date{
  color:#000;
  text-decoration: none;
  padding: 0 10px;
}
.card-title{
  color:#dc7332;
  text-decoration: none;
  padding: 0 10px;
}
.card-lower{
  margin-top:10px;
  display:flex:
  justify-content: space-between;
  padding: 0 10px;
}
.card-thumbnail{
  min-width:100%;
}

@media screen and (max-width:450px) {
  .card{
    margin: 0;
    border-radius: 1px;
    flex: 0 0 95%;
    margin-bottom:10px;
  }
}
`

export default article_style;
