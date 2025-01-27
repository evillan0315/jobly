import "@/styles/global.css";
import * as React from "react";
import { AppProvider } from "@toolpad/core/nextjs";
//import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { useRouter } from "next/router";
import { AppCacheProvider } from "@mui/material-nextjs/v15-pagesRouter";
//import DashboardIcon from "@mui/icons-material/Dashboard";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import type { Navigation } from "@toolpad/core/AppProvider";
import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";
import LinearProgress from "@mui/material/LinearProgress";
import { FaUserCircle } from "react-icons/fa";
import { FaLaptopCode, FaStar, FaQuoteRight } from "react-icons/fa6";
import DynamicLayout from "@/components/layout/DynamicLayout";
import SEOHead from "@/components/SEOHead";
import theme, { roboto } from "../theme";
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

const BRANDING = {
  title: "Eddie's Workspace",
  // logo: <Logo width={30} height={30} />,
};

const AUTHENTICATION = {
  signIn,
  signOut,
  error: "/auth/error", // Error code passed in query string as ?error=
  verifyRequest: "/auth/verify-request", // (used for check email message)
  newUser: "/auth/sign-up", // New users will be directed here on first sign in (leave the property out if not of interest)
};
const NAVIGATION: Navigation = [
  {
    kind: "header",
    title: "Navigation",
  },
  {
    title: "About Me",
    segment: "/about",
    icon: <FaUserCircle />,
  },
  {
    title: "Projects",
    segment: "/projects",
    icon: <FaLaptopCode />,
  },
  {
    title: "Highlights",
    segment: "/highlights",
    icon: <FaStar />,
  },
  {
    title: "Testimonials",
    segment: "/testimonials",
    icon: <FaQuoteRight />,
  },
];
function AppLayout({ children }: { children: React.ReactNode }) {
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
}

export default function App(props: AppPropsWithLayout) {
  const {
    Component,
    pageProps: { session, ...pageProps },
  } = props;
  console.log(session);
  const getLayout = Component.getLayout ?? getDefaultLayout;
  const requireAuth = Component.requireAuth ?? true;

  let pageContent = getLayout(<Component {...pageProps} />);
  if (requireAuth) {
    pageContent = <RequireAuth>{pageContent}</RequireAuth>;
  }
  pageContent = <AppLayout>{pageContent}</AppLayout>;

  return (
    <AppCacheProvider {...props}>
      <SessionProvider session={session}>{pageContent}</SessionProvider>
    </AppCacheProvider>
  );
}
