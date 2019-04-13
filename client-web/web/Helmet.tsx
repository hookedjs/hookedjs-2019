import * as React from "react";
import {Helmet} from "react-helmet";
import {AppName} from "../../../../client-web/config";

export class HelmetDefault extends React.PureComponent<{title?: string}> {
  render() {
    // const url = `${config.baseUrl}${location.pathname}${location.search}${location.hash}`;
    const {title} = this.props;
    return (
      <Helmet>
        <title>
          {AppName}
          {title ? ` | ${title}` : ""}
        </title>
        <link rel="canonical" href={window.location.href} />
      </Helmet>
    );
  }
}

// Stateless has issues with render infinite loop. Use PureComponent instead
// Ref: https://github.com/facebook/react/issues/5677
// export const HelmetDefault = ({title}: {title?: string}) => {
//   // const url = `${config.baseUrl}${location.pathname}${location.search}${location.hash}`;
//   return (
//     <Helmet>
//       <title>
//         {Config.appName}
//         {title ? ` | ${title}` : ""}
//       </title>
//       <link rel="canonical" href={window.location.href}/>
//     </Helmet>
//   );
// };
