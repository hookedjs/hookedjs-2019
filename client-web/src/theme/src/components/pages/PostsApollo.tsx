/**
 * This is an untested example of using GraphQL Apollo.
 *
 *
import React from "react";
import withSheet, {StyleCreator, WithSheet} from "react-jss";
import {Apollo, gql} from "~/core/data/Apollo";
import {RoutePosts_Query, RoutePosts_Query_forums_nodes} from "../@types/__generated__/RoutePosts_Query";

const style: StyleCreator<any, any> = (theme) => ({
  wrapper: {},
});

export type props = WithSheet<typeof style> & {};

export const PostsApollo = withSheet(style)(({classes}: props) => {
  const [postDocs, setPostDocs] = React.useState<(RoutePosts_Query_forums_nodes | null)[]>([]);
  React.useEffect(() => {
    setPostDocs([]);
    // const postsSubscription = Firebase.firestore()
    //   .collection("posts")
    //   .where("isPublic", "==", true)
    //   .orderBy("publishedAt", "desc")
    //   .limit(16)
    //   .onSnapshot((snap) => {
    //     setPostDocs(snap.docs);
    //   });

    Apollo.query({
      query: gql`
        query RoutePosts_Query {
          forums {
            nodes {
              id
              slug
            }
          }
        }
      `,
    }).then((result) => {
      const data = result.data as RoutePosts_Query;
      setPostDocs(data.forums ? data.forums.nodes : []);
    });

    const postsSubscription = () => null;

    return () => postsSubscription;
  }, [false]);

  return (
    <div>
      <h1>Hello, WOrld</h1>
      {postDocs.map((doc) => doc && <h3 key={doc.slug}>{doc.slug}</h3>)}
    </div>
  );
});

export default PostsApollo;
*/
