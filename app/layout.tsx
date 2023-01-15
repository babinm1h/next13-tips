import React, { FC, PropsWithChildren } from "react";
import "@styles/globals.scss";

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html>
      <head>
        <title>Next</title>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
      </head>
      <body>
        <div id="next">{children}</div>
      </body>
    </html>
  );
};

export default RootLayout;
