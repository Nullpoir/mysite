import css from 'styled-jsx/css';

export const search_style = css`
  .search-container{
    width: 100%;
    height:24px;
    display:flex;
    justify-content:center;
    margin: 10px 0;
  }
  .search-box::placeholder{
    width: 100%;
    font-size:1.4rem;
    display:flex;
    text-align: center;
    vertical-align: center;
  }
  .search-box{
    -webkit-appearance: none;
    width:250px;
    height:2rem;
    border: solid 1px gray;
    box-shadow: 0px 0px 1px 1px gray;
    text-align: center;
  }

`
export const category_style1 = css`
  .category-item{
    color:#333;
    cursor: pointer;
    margin: 0 10px;
  }
`

export const category_style2 = css`
  .category-field{
    display: flex;
    justify-content:center;
    align-items:center;
    width:100%;
    overflow-x: scroll;
    margin-bottom:20px;
  }
`

export const tags_style1 = css`
.tag-item{
  color: white;
  background-color: #61dafb;
  margin-right: 10px;
  border: solid 2px #61dafb;
  padding: 1px 10px;
  border-radius: 5px;
  font-weight: bold;
  font-size: 1.3rem;
  cursor: pointer
}
.tag-item:hover{
  opacity:0.8;
}
`

export const tags_style2 = css`
.tag-field{
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}`

export const card_style = css`

.card{
  box-shadow: 0px 0px 1px 1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12);
  margin-right: 20px;
  margin-bottom: 20px;
  border-radius: 1px;
  max-width:400px;
  flex: 0 0 calc(50% - 40px);
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

export const list_style = css`

.card-container {
  display: flex;
  flex-direction: row;
  justify-content:center;
  width:100%;
  padding-left:20px;
  flex-wrap: wrap;
}
.intro-field{
  font-size:1.2rem;
}
@media screen and (max-width:800px) {
  .card-container {
    padding:0;
  }
}
`

export const pager_style = css`
.pager-container{
  display: flex;
  align-items: center;
  justify-content: center;
  color: gray;
}
.pager-button{
  border-radius: 1px;
  padding: 0 10px;
  cursor: pointer;
  padding: 5px 10px;
  box-shadow: 0px 0px 1px 1px gray;
}
.pager-button.next{
  margin-left: 20px;
}
.pager-button.prev{
  margin-right: 20px;
}
.pager-button:hover{
  opacity:0.7;
}
.current,.last{
  cursor:pointer;
}
`

export const null_style = css`
  .null-field{
    height:99vh;
    display:block;
    background:white;
  }
`
