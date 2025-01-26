import "@/styles/global.css";
import * as React from "react";

//import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { useRouter } from "next/router";
import { AppCacheProvider } from "@mui/material-nextjs/v15-pagesRouter";

import type { NextPage } from "next";
import type { AppProps } from "next/app";

import { SessionProvider, useSession } from "next-auth/react";
import LinearProgress from "@mui/material/LinearProgress";

import DynamicLayout from "@/components/layout/Layout";

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: () => React.ReactNode;
  requireAuth?: boolean;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function getDefaultLayout(page: React.ReactElement<any>) {
  return (
    <main className="relative z-10 w-full h-screen">
      <DynamicLayout>{page}</DynamicLayout>
    </main>
  );
}

function RequireAuth({ children }: { children: React.ReactNode }) {
  const { status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <LinearProgress />;
  }

  if (status === "unauthenticated") {
    router.push("/auth/sign-in");
  }

  return children;
}

/* function AppLayout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  return (
    <React.Fragment>
      <SEOHead />
      <AppProvider
        theme={theme}
        navigation={NAVIGATION}
        branding={BRANDING}
        session={session}
        authentication={AUTHENTICATION}
      >
        <main className={roboto.variable}>{children}</main>
      </AppProvider>
    </React.Fragment>
  );
} */

export default function App(props: AppPropsWithLayout) {
  const {
    Component,
    pageProps: { session, ...pageProps },
  } = props;

  const getLayout = Component.getLayout ?? getDefaultLayout;
  const requireAuth = Component.requireAuth ?? false;

  let pageContent = getLayout(<Component {...pageProps} />);
  if (requireAuth) {
    pageContent = <RequireAuth>{pageContent}</RequireAuth>;
  }
  pageContent = <DynamicLayout>{pageContent}</DynamicLayout>;

  return (
    <AppCacheProvider {...props}>
      <SessionProvider session={session}>{pageContent}</SessionProvider>
    </AppCacheProvider>
  );
}
