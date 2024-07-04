import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <h1 className="font-bold text-3xl md:text-6xl">
        Monk's Terms of Service
      </h1>
      <Separator className="mt-3 w-3/4" />
      <div className="text-xl md:text-2xl w-1/2 [&>h3]:mt-5 [&>h3]:font-medium [&>p]:mt-4 [&>p]:ml-4 text-left">
        <h3>Introduction</h3>
        <p>
          This is a portfolio project created by{" "}
          <Link
            href="https://danielmamuza.com"
            className="hover:font-bold transition-all font-semibold"
          >
            Daniel Mamuza
          </Link>
          . By using this Service, you agree to these Terms of Service.
        </p>
        <h3>1. About</h3>
        <Button variant="outline" className="ml-4">
          <Link
            href="/about"
            className="hover:font-bold transition-all font-semibold"
          >
            See here
          </Link>
        </Button>
        <h3>2. Accounts</h3>
        <p>
          Accounts and organizations on Monk are handled by Clerk and its
          services. Any user is allowed to delete their account in the account
          portal. If you have any concerns, contact me{" "}
          <Link
            href="https://danielmamuza.com"
            className="hover:font-bold transition-all font-semibold"
          >
            here
          </Link>
          .
        </p>

        <h3>3. Subscription</h3>
        <p>
          Monk uses Stripe for subscriptions, which are intended for practice
          purposes in developer mode. Subscription and payments themselves are
          free of charge and are meant solely as a practice. Any user is allowed
          to delete their payment details and info in the billing portal. If you
          have any concerns, contact me{" "}
          <Link
            href="https://danielmamuza.com"
            className="hover:font-bold transition-all font-semibold"
          >
            here
          </Link>
          .
        </p>

        <h3>4. User Content</h3>
        <p>
          Users retain ownership of any content they create on Monk. You are
          responsible for the content you post.
        </p>

        <h3>5. Acceptable Use</h3>
        <p>
          Do not use this Service for illegal activities or to harm others.
        </p>

        <h3>6. Termination</h3>
        <p>
          You can terminate your account at any time. Monk reserve the right to
          suspend or terminate accounts if necessary.
        </p>

        <h3>
          7. Disclaimers and Limitation of Liability
        </h3>
        <p>
          This Service is provided "as is" with no warranties. Monk am not
          liable for any damages arising from your use of this Service.
        </p>

        <h3>8. Privacy Policy</h3>
        <p>
          Your data is managed according to the Privacy Policy. This project
          uses Clerk for authentication and Stripe for payment processing.
        </p>

        <h3>9. Changes to the Terms</h3>
        <p>
          Monk may update these Terms from time to time. Your continued use of
          the Service means you accept the new Terms.
        </p>

        <h3>10. Contact Information</h3>
        <p>
          For questions about these Terms, please contact me{" "}
          <Link
            href="https://danielmamuza.com"
            className="hover:font-bold transition-all font-semibold"
          >
            here
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
