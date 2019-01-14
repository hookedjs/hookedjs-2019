import * as React from "react";
import GridItem from "~/themes/bubbly/components/layouts/Grid/GridItem";
import Card from "~/themes/bubbly/components/modules/Card/Card";
import CardBody from "~/themes/bubbly/components/modules/Card/CardBody";
import GridContainer from "~/themes/bubbly/components/layouts/Grid/GridContainer";

export const LoadingRow = () => {
  return (
    <GridContainer justify="center">
      <GridItem xs={12} sm={12} md={6}>
        <Card>
          <CardBody style={{ textAlign: "center" }}>Loading...</CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
};
export default LoadingRow;
