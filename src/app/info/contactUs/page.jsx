import Header from "@/components/Header";
import React from "react";

function ContactUs() {
  return (
    <>
      <Header />
      <div className="mx-auto p-8 h-fit border rounded-lg mt-24 shadow-xl bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12 mt-4">
          Contact Us
        </h1>

        <div className="space-y-8">
          <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-xl font-semibold text-gray-700 mb-3">Email</h2>
            <p className="text-base text-gray-600 mb-2">
              You can reach us via email at:
            </p>
            <a
              href="mailto:support@nielittezourlibrary.com"
              className="text-base text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200"
            >
              support@nielittezourlibrary.com
            </a>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-xl font-semibold text-gray-700 mb-3">Phone</h2>
            <p className="text-base text-gray-600 mb-2">
              For any inquiries, call us at:
            </p>
            <p className="text-base text-blue-600">+1 (123) 456-7890</p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-xl font-semibold text-gray-700 mb-3">
              Address
            </h2>
            <p className="text-base text-gray-600 mb-2">
              Our office is located at:
            </p>
            <p className="text-base text-blue-600">
              NIELIT Tezpur Library, <br />
              Tezpur, District 123, <br />
              Country Name
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-xl font-semibold text-gray-700 mb-3">
              Operating Hours
            </h2>
            <p className="text-base text-gray-600 mb-2">
              We are open during the following hours:
            </p>
            <ul className="list-disc ml-6 text-base text-gray-600">
              <li>Monday - Friday: 9:00 AM - 6:00 PM</li>
              <li>Saturday: 10:00 AM - 4:00 PM</li>
              <li>Sunday: Closed</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactUs;
