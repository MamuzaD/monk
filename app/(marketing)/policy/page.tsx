import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <h1 className="font-bold text-3xl md:text-6xl">
        Monk&apos;s Privacy Policy
      </h1>
      <Separator className="mt-3 w-3/4" />
      <div className="text-xl md:text-2xl w-1/2 [&>h3]:mt-5 [&>h3]:font-medium [&>p]:mt-4 [&>p]:ml-4 text-left">
        <h3>Privacy Policy</h3>
        <p>
          This Privacy Policy describes how Monk collects, uses, and shares
          personal information when you use Monk. This app is a portfolio
          project created by{" "}
          <Link
            href="https://danielmamuza.com"
            className="hover:font-bold transition-all font-semibold"
          >
            Daniel Mamuza
          </Link>
        </p>
        <h3>1. Information We Collect</h3>
        <ul className="list-disc ml-10">
          <li>
            Account Information: When you create an account using Clerk, Clerk
            collects your email address and any other information you provide
            during registration.
          </li>
          <li>
            Payment Information: If you choose to subscribe to Monk&apos;s paid
            (free) plans, Stripe collects payment information through Stripe.
            This includes your payment method details
          </li>
          <li>
            Content: We collect the content you create, such as kanban boards
            and notes.
          </li>
        </ul>
        <h3>2. How We Use Information</h3>
        <p>
          Information is not used for any service, this portfolio project is
          merely practice and preparation to develop SASS apps.
        </p>
        <h3>3. Sharing of Information</h3>
        <p>
          No information is shared other than to Clerk and Stripe in which is
          declared during account registration and payment registration.
        </p>
        <h3>4. Data Security</h3>
        <p>Data is held on a PostgreSQL database via Supabase.</p>
        <h3>5. Your Choices</h3>
        <ul className="list-disc ml-10">
          <li>
            Account Information: When you create an account using Clerk, Clerk
            collects your email address and any other information you provide
            during registration.
          </li>
          <li>
            Payment Information: If you choose to subscribe to Monk&apos;s paid
            (free) plans, Stripe collects payment information through Stripe.
            This includes your payment method details
          </li>
        </ul>
        <h3>7. Contact Information</h3>
        <p>
          If you have any questions about this Privacy Policy, please contact me{" "}
          <Link
            href="https://danielmamuza.com"
            className="hover:font-bold transition-all font-semibold"
          >
            here
          </Link>
        </p>
      </div>
    </div>
  );
}
