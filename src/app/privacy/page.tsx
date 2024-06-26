import { Card } from "@/components/Card";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for the UABC Booking Portal",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-dvh flex justify-center">
      <Card
        variant="card"
        className="p-4 pt-6 sm:m-8 md:w-3/4 md:p-12 lg:w-1/2 text-pretty flex flex-col gap-y-2"
      >
        <h1 className="text-3xl font-extrabold">Privacy Policy</h1>
        <p className="text-tertiary my-4">
          Effective date: <strong>27th of June, 2024</strong>
        </p>
        <p>
          The Web Development Consulting Club (registered charity), or WDCC,
          (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) operates the UABC
          Booking Portal web application (the &quot;App&quot;). This page
          informs you of our policies regarding the collection, use, and
          disclosure of personal data when you use our App and the choices you
          have associated with that data.
        </p>
        <h2 className="text-2xl font-bold mt-4">
          Information Collection and Use
        </h2>
        <h3 className="text-xl font-bold mt-2">Data we collect</h3>
        <p>
          While using our App, we may ask you to provide us with certain
          personally identifiable information that can be used to contact or
          identify you (&quot;Personal Data&quot;). Personally identifiable
          information may include, but is not limited to:
        </p>
        <ul className="list-disc ml-8">
          <li>Email address</li>
          <li>First name and last name</li>
          <li>Hashed Passwords</li>
        </ul>
        <h3 className="text-xl font-bold mt-2">How we use your data</h3>
        <p>We use the collected data in order to:</p>
        <ul className="list-disc ml-8">
          <li>Provide and maintain the App</li>
          <li>Let you engage with the App</li>
          <li>Email you with information such as booking confirmations</li>
        </ul>
        <h3 className="text-xl font-bold mt-2">Data Security and Retention</h3>
        <p>
          We prioritize the security of your data and take reasonable steps to
          protect it from unauthorized access, disclosure, alteration, and
          destruction.
        </p>
        <p>
          We retain Personal Data about you for as long as you have an open
          account with us or as otherwise necessary to provide you with our
          services.
        </p>
        <h3 className="text-xl font-bold mt-2">Information Sharing</h3>
        <p>
          We do not share your personal information with third parties unless
          required by law or as necessary to provide our services.
        </p>
        <h3 className="text-xl font-bold mt-2">Cookies and tracking</h3>
        <p>
          Cookies are small text files that are placed on your computer by the
          websites that you visit. They are widely used in order to make
          websites work, or work more efficiently, as well as to provide
          information to the owners of the site.
        </p>
        <p>We use the following types of Cookies:</p>
        <ul className="list-disc ml-8">
          <li>
            <strong>Required Cookies:</strong> Certain cookies are required for
            the App to function. When you log in to the App, authentication
            cookies are stored to identify you and maintain your session.
          </li>
          <li>
            <strong>Functional Cookies:</strong> Some cookies are used to
            remember your preferences and settings. For example your name, and
            choice of theme.
          </li>
        </ul>
        <p>
          The App does not use tracking cookies or any other tracking
          mechanisms. You may choose to disable cookies from your browser
          settings. However, this may limit your ability to use certain features
          of the App.
        </p>
        <h3 className="text-xl font-bold mt-2">
          Changes to This Privacy Policy{" "}
        </h3>
        <p>
          We may update our Privacy Policy from time to time. We will notify you
          of any changes by posting the new Privacy Policy on this page.
        </p>
        <h3 className="text-xl font-bold mt-2">Contact Information</h3>
        If you have any questions about this Privacy Policy, please do not
        hesitate to contact us at:
        <p className="mt-4">
          <strong>Email:</strong> uabc@projects.wdcc.co.nz
        </p>
      </Card>
    </div>
  );
}
