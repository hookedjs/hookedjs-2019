import React from "react";

// core components
import GridContainer from "~/theme/current/components/Grid/GridContainer";
import GridItem from "~/theme/current/components/Grid/GridItem";
import Heading from "~/theme/current/components/Heading/Heading";
import Timeline from "~/theme/current/components/Timeline/Timeline";
import Card from "~/theme/current/components/Card/Card";
import CardBody from "~/theme/current/components/Card/CardBody";

import { stories } from "~/theme/current/demo/var/general";

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
