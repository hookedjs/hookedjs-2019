import React from "react";
import {Flex, Box} from "rebass";
import {Base} from "./Base";
import {Header} from "../modules/Header";
import {Footer} from "../modules/Footer";
import {Sidebar as SidebarSection} from "../modules/Sidebar";


export type props = {
  children: React.ReactNode;
};

export const Sidebar = (({children}: props) => {
  return (
    <Base>
      <Flex style={{minHeight: "100vh"}} flexDirection="column">
        <Header />
        <Flex flex={1}>
          <Box  bg="#aaa" width={[0, 180]} height="100%">
            <SidebarSection />
          </Box>
          <Box width="100%">
            {children}
          </Box>
        </Flex>
        <Footer />
      </Flex>
    </Base>
  );
});
