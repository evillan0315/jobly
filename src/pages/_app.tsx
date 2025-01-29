import "@/styles/global.css";
import * as React from "react";
import { AppProvider } from "@toolpad/core/nextjs";
import { useRouter } from "next/router";
import { AppCacheProvider } from "@mui/material-nextjs/v15-pagesRouter";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import type { Navigation } from "@toolpad/core/AppProvider";
import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";
import LinearProgress from "@mui/material/LinearProgress";
import { FaUserCircle } from "react-icons/fa";
import { FaLaptopCode, FaStar, FaQuoteRight } from "react-icons/fa6";
import DynamicLayout from "@/components/layout/DynamicLayout";
import SEOHead from "@/components/SEOHead";
import theme from "../theme";
import { useColorScheme } from "@mui/material/styles";
export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: () => React.ReactNode;
  requireAuth?: boolean;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
export function ModeSwitcher() {
  const { mode, setMode } = useColorScheme();

  if (!mode) {
    return null;
  }

  return (
    <select
      value={mode}
      onChange={(event: any) => {
        setMode(event.target.value);
        // For TypeScript, cast `event.target.value as 'light' | 'dark' | 'system'`:
      }}
    >
      <option value="system">System</option>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </select>
  );
}
function getDefaultLayout(page: React.ReactElement<any>) {
  return (
    <>
      <DynamicLayout>{page}</DynamicLayout>
    </>
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
        {children}
      </AppProvider>
    </React.Fragment>
  );
}

export default function App(props: AppPropsWithLayout) {
  const {
    Component,
    pageProps: { session, ...pageProps },
  } = props;

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
