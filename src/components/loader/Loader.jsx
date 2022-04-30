import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/react";
import './loader.css' 

const override = css`
  display : block
`;

const Loader  = ({loading})=>{
  return (
      <div className={loading ? "loader" : "hide"} >
      <ClipLoader size={80} loading={loading} css={override} color="#131921"/>
      </div>
  )
}

export default Loader