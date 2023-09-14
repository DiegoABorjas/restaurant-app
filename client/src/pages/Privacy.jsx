import { useQuery } from '@apollo/client';
//import Carousel2 from '../pages/Carousel';

const Privacy = () => {
  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white dark:bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl">
        <h1 className="text-2xl font-semibold mb-4">Privacy Policy</h1>
        <p className="mb-4">
          Your privacy is important to us. This Privacy Policy explains how we
          collect, use, disclose, and safeguard your information when you visit
          our restaurant website.
        </p>
        <p className="mb-4">
          Information We Collect: We may collect personal information such as
          your name, email address, and phone number when you make a
          reservation or sign up for our newsletter.
        </p>
        <p className="mb-4">
          How We Use Your Information: We use your information to provide you
          with updates, offers, and to process reservations.
        </p>
        <p className="mb-4">
          Third-Party Disclosure: We do not sell or share your personal
          information with third parties without your consent.
        </p>
        <p className="mb-4">
          Security: We take security seriously and implement measures to
          protect your information.
        </p>
      </div>
    </div>
    </>
  );
};

export default Privacy;
