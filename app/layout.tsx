import React, { FC, PropsWithChildren } from "react";
import "@styles/globals.scss";
import ReactQueryWrapper from "@components/ReactQueryWrapper/ReactQueryWrapper";

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html>
      <head>
        <title>Next</title>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
      </head>
      <body>
        <ReactQueryWrapper>
          <div id="next">{children}</div>
        </ReactQueryWrapper>
      </body>
    </html>
  );
};

export default RootLayout;
