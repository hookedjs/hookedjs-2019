import React from "react";

// core components
import GridContainer from "~/themes/bubbly/components/layouts/Grid/GridContainer";
import GridItem from "~/themes/bubbly/components/layouts/Grid/GridItem";
import Heading from "~/themes/bubbly/components/modules/Heading/Heading";
import Timeline from "~/themes/bubbly/components/modules/Timeline/Timeline";
import Card from "~/themes/bubbly/components/modules/Card/Card";
import CardBody from "~/themes/bubbly/components/modules/Card/CardBody";

import { stories } from "~/themes/bubbly/components/demo/var/general";

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
