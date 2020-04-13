import css from 'styled-jsx/css';

export const inquiry_style = css`
.form{
  display: flex;
  flex-direction: column;
}

.name-field{
  width:50%;
}
.email-field{
  width:50%;
}
.text-field{
  height:200px;
}
.submit-container{
  margin-top:10px;
  display: flex;
  justify-content: center;
}
.submit{
  width: 250px;
  border: solid 1px gray;
  border-radius: 20px;
  padding:10px;
  cursor: pointer;
}
.submit:hover{
  background: #61dafb;
}
@media screen and (max-width:800px) {
  .name-field{
    width:100%;
  }
  .email-field{
    width:100%;
  }
}
`
