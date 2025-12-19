import { Fragment } from "react";

import { RedirectToast } from "@/components/redirect-toast";

type RootTemplateProps = {
  children: React.ReactNode;
};

export default function RootTemplate({ children }: RootTemplateProps) {
  return (
    <Fragment>
      <Fragment>{children}</Fragment>
      <RedirectToast />
    </Fragment>
  );
}
