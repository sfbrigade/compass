import Image from "next/image";
import $typo from "@/styles/Typography.module.css";

const About = () => {
  return (
    <>
      <h2>About Compass</h2>
      {/* <Image
        src="/img/compass-logo.svg"
        alt="logo"
        width={64}
        height={64}
        priority
      /> */}
      <div>
        Compass is a civic app we are building for the San Francisco Unified
        School District. The app seeks to assist Teachers with setting and
        tracking goals for students with disabilities.
      </div>
      <div></div>
    </>
  );
};

export default About;
