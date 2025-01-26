"use client";
import * as React from "react";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";

import { SignInPage, type AuthProvider } from "@toolpad/core/SignInPage";
import { getProviders } from "next-auth/react";
import { getServerSession } from "next-auth/next";
//import { useRouter } from "next/router";
import { authOptions } from "../api/auth/[...nextauth]";

export default function SignIn({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log(providers);
  //const router = useRouter();
  return (
    <SignInPage
      providers={providers}

      //slots={{ forgotPasswordLink: ForgotPasswordLink, signUpLink: SignUpLink }}
    />
  );
}

SignIn.getLayout = (page: React.ReactNode) => page;

SignIn.requireAuth = false;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    return { redirect: { destination: "/" } };
  }

  const providers = await getProviders();
  let providerMap: AuthProvider[] = [];
  if (providers) {
    providerMap = Object.entries(providers).map(([id, provider]) => {
      return { id, name: provider.name };
    });
  }

  return {
    props: {
      providers: providerMap,
    },
  };
}
