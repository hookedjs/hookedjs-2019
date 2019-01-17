import React from "react";

// core components
import GridContainer from "@bubbly/components/layouts/Grid/GridContainer";
import GridItem from "@bubbly/components/layouts/Grid/GridItem";
import Heading from "@bubbly/components/modules/Heading/Heading";
import Timeline from "@bubbly/components/modules/Timeline/Timeline";
import Card from "@bubbly/components/modules/Card/Card";
import CardBody from "@bubbly/components/modules/Card/CardBody";

import { stories } from "@bubbly/components/demo/var/general";

class TimelinePage extends React.Component {
  render() {
    return (
      <div>
        <Heading title="Timeline" textAlign="center" />
        <GridContainer>
          <GridItem xs={12}>
            <Card plain>
              <CardBody plain>
                <Timeline stories={stories} />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default TimelinePage;
