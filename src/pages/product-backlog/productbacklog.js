import React from "react";
import SideBar from "../../components/side-bar/side-bar.component";
import photo from "../../assets/images/productbacklog.svg";
import WarningIcon from "@material-ui/icons/Warning";
// import "./productbacklog.scss";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import { Link } from "react-router-dom";
import ProductBacklogNoProject from "../../components/product-backlog/ProductBacklogNOProjects.component";
import ProductBacklogContainer from "../../components/product-backlog/ProductBacklogContainer.component"
function ProductBacklog() {
  return (
    <div>
      <SideBar />
      <div>
        {/*<ProductBacklogNoProject/>*/}
        <ProductBacklogContainer/>
      </div>
    </div>
  );
}

export default ProductBacklog;
