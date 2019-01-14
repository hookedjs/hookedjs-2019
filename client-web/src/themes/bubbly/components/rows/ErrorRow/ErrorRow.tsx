import * as React from "react";
import { Link } from "react-router-dom";
import GridItem from "~/themes/bubbly/components/layouts/Grid/GridItem";
import Card from "~/themes/bubbly/components/modules/Card/Card";
import CardBody from "~/themes/bubbly/components/modules/Card/CardBody";
import GridContainer from "~/themes/bubbly/components/layouts/Grid/GridContainer";

export const ErrorRow = ({
  title,
  content
}: {
  title?: string;
  content?: string;
}) => {
  return (
    <GridContainer justify="center">
      <GridItem xs={12} sm={12} md={6}>
        <Card>
          <CardBody style={{ textAlign: "center" }}>
            <h2>{title ? title : "404"}</h2>
            <p>{content ? content : "Sorry, the route you requested does not exist"}</p>
            <p>
              <Link to="/" className="btn btn-primary">
                Want to report this?
              </Link>
            </p>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
};
export default ErrorRow;
