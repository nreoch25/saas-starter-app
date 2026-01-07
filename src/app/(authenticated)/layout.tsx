import { Fragment, ReactNode } from "react";

import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";

export default async function AuthenticatedLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  await getAuthOrRedirect();

  return <Fragment>{children}</Fragment>;
}
