import css from 'styled-jsx/css';

export const btn_style = css`
  .nav-button{
    height: 100%;
    display:flex;
    align-items:center;
    flex-direction: column;
    justify-content:center;
  }

  .menu-bars:nth-of-type(1) {
    height: 8px;
    width:28px;
    display: block;
    border-top: solid 1px white;
    transition: 0.5s;
    z-index: 10003;
  }
  .menu-bars:nth-of-type(2) {
    height: 8px;
    width:28px;
    display: block;
    border-top: solid 1px white;
    transition: 0.5s;
    z-index: 10003;
  }

  .menu-bars.isOpen:nth-of-type(1) {
    transform: rotate(-45deg)translateY(4px)translateX(3px);
    transition: 0.4;
  }
  .menu-bars.isOpen:nth-of-type(2) {
    transform: rotate(45deg)translateY(-5px)translateX(-5px);
    transition: 0.4;
  }

  @media screen and (max-width:800px) {
    .side{
      display:none;
    }
  }
`

export const btn_popup_style = css`
  .nav-button{

  }
  .menu-bars:nth-of-type(1) {
    transform: rotate(-45deg)translateY(4px)translateX(3px);
    transition: 0.4;
  }
  .menu-bars:nth-of-type(2) {
    transform: rotate(45deg)translateY(-5px)translateX(-5px);
  }
  @media screen and (max-width:800px) {
    .side{
      display:block;
      width:60%;
    }
  }
`

export const side_style = css`
  .side{
    width:25%;
    padding-left: 2%;
    word-wrap: break-word;
    position: fixed;
    top:50px;
    bottom:0;
    right:0;
    background-color: #F7F7F7;
    height: calc(100% - 50px);
    z-index: 50;
    border-left: solid 1px #ECECEC;
    -webkit-transform: translate3d(0,0,0)
    overflow-y: scroll;
  }
  @media screen and (max-width:800px) {
    .side{
      display:none;
    }
  }
`

export const side_popup_style = css`
  .side{
    width:25%;
    padding-left: 2%;
    word-wrap: break-word;
    position: fixed;
    top:50px;
    bottom:0;
    right:0;
    background-color: #F7F7F7;
    height: calc(100% - 50px);
    z-index: 50;
    border-left: solid 1px #ECECEC;
    -webkit-transform: translate3d(0,0,0)
    overflow-y: scroll;
  }
  @media screen and (max-width:800px) {
    .side{
      display:block;
      width:60%;
    }
  }
`
