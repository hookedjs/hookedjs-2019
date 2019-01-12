import React from "react";

import {Apollo, gql} from "~/core/data/Apollo";
import { RoutePosts_Query, RoutePosts_Query_forums_nodes } from "~/@types/__generated__/RoutePosts_Query";

// core components
import GridContainer from "~/theme/current/components/Grid/GridContainer";
import GridItem from "~/theme/current/components/Grid/GridItem";

export const Posts = () => {

  const [postDocs, setPostDocs] = React.useState<(RoutePosts_Query_forums_nodes | null)[]>([]);
  React.useEffect(
    () => {
      setPostDocs([]);
      // const postsSubscription = Firebase.firestore()
      //   .collection("posts")
      //   .where("isPublic", "==", true)
      //   .orderBy("publishedAt", "desc")
      //   .limit(16)
      //   .onSnapshot((snap) => {
      //     setPostDocs(snap.docs);
      //   });


      Apollo
        .query(
          {
            query: gql`
              query RoutePosts_Query {
                forums {
                  nodes {
                    id
                    slug
                  }
                }
              }
            `
          }
        )
        .then(result => {
          const data = result.data as RoutePosts_Query;
          setPostDocs(data.forums ? data.forums.nodes : []);
        });

      const postsSubscription = () => null;

      return () => postsSubscription;
    },
    [false]
  );

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <h1>Hello, WOrld</h1>
          {postDocs.map((doc) => doc && (
            <h3 key={doc.slug}>{doc.slug}</h3>
          ))}
        </GridItem>
      </GridContainer>
    </div>
  );
};

export default Posts;
