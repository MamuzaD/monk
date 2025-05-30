import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/tos",
  "/policy",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/demo",
  "/about",
  "/api/webhook",
]);

const isMarketingRoute = createRouteMatcher(["/tos", "/about", "/policy"]);

export default clerkMiddleware((auth, req) => {
 
  if (auth().userId && isPublicRoute(req) && !isMarketingRoute(req)) {
    let path = "/select-org";
    
    if (auth().orgId)
      path = `/organization/${auth().orgId}`

    const orgSelection = new URL(path, req.url)
    return NextResponse.redirect(orgSelection);
  }

  if(!auth().userId && !isPublicRoute(req)) //user not signed and trying to access protected route
    return auth().redirectToSignIn({ returnBackUrl: req.url });
  
  if (auth().userId && !auth().orgId && req.nextUrl.pathname !== "/select-org"){ //user logged in w/o org
    const orgSelection = new URL("/select-org", req.url);
    return NextResponse.redirect(orgSelection);
  }
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};

