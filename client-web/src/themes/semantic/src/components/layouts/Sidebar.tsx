import React from "react";
import withSheet, {StyleCreator, WithSheet} from "react-jss";
import {Grid} from "semantic-ui-react";
import {Header} from "../modules/Header";
import {Footer} from "../modules/Footer";
import {Sidebar as SidebarSection} from "../modules/Sidebar";

const style: StyleCreator<any, any> = (theme) => ({
  wrapper: {},
});

export type props = WithSheet<typeof style> & {
  children: React.ReactNode;
};

export const Sidebar = withSheet(style)(({classes, children}: props) => {
  return (
    <div className={classes.wrapper}>
      <Header />
      <Grid columns={2} stretched>
        <Grid.Column width={2} style={{paddingRight: 0}}>
          <SidebarSection />
        </Grid.Column>
        <Grid.Column width={14} style={{paddingLeft: 0}}>
          {children}
        </Grid.Column>
      </Grid>
      <Footer />
    </div>
  );
});

export default (Sidebar as unknown) as React.ComponentClass;
