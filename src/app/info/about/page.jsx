import Image from "next/image";

import Header from "@/components/Header";

export const metadata = {
  title: "About - NIELIT Tezour Library Management System",
};

export default async function Page() {
  return (
    <>
      <Header />
      <div className="grid grid-cols-5 gap-x-24 gap-y-32 text-lg items-center p-8 pt-32 ">
        {" "}
        {/* Added pt-32 to provide space for the sticky header */}
        <div className="col-span-3">
          <h1 className="text-4xl mb-10 text-accent-400 font-medium">
            Welcome to NIELIT Tezour Library
          </h1>

          <div className="space-y-8">
            <p>
              The NIELIT Tezour Library is a center of knowledge and resources,
              where academic growth meets technological advancement. Located at
              the heart of NIELIT Tezour, our library offers an extensive
              collection of books, research materials, and digital resources
              designed to support learning and research.
            </p>
            <p>
              Our library is more than just a place to borrow books; it is a
              space for innovation, learning, and collaboration. With modern
              facilities and a friendly atmosphere, we aim to provide the tools
              that empower students and professionals alike.
            </p>
            <p>
              Whether you're looking for textbooks, journals, or the latest
              research in your field, NIELIT Tezour Library is here to support
              your academic journey.
            </p>
          </div>
        </div>
        <div className="relative aspect-square col-span-2">
          <Image src="/about-1.jpg" fill alt="Library interior" />
        </div>
        <div className="relative aspect-square col-span-2">
          <Image src="/about-2.jpg" fill alt="Students studying in library" />
        </div>
        <div className="col-span-3">
          <h1 className="text-4xl mb-10 text-accent-400 font-medium">
            Our Legacy and Commitment to Education
          </h1>

          <div className="space-y-8">
            <p>
              Since its establishment, the NIELIT Tezour Library has been
              dedicated to providing comprehensive resources to support
              students, faculty, and researchers. With an ever-expanding digital
              and physical catalog, we aim to foster an environment conducive to
              academic success and intellectual curiosity.
            </p>
            <p>
              Our team works tirelessly to ensure that the library remains a
              state-of-the-art resource center. Whether it's through offering
              digital library access, maintaining an up-to-date book collection,
              or providing assistance in navigating academic resources, we're
              here to help.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
