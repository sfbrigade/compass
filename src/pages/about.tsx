import React, { useEffect } from "react";
import $button from "@/styles/Button.module.css";
import { useRouter } from "next/router";

const About = () => {
  const router = useRouter();

  return (
    <>
      <button
        className={$button.about}
        onClick={() => router.push("/signInPage")}
      >
        home
      </button>
      <div>About Page</div>
    </>
  );
};

export default About;
