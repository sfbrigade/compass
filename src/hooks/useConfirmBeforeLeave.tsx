import { Router } from "next/router";
import { useEffect } from "react";
import { useBeforeUnload } from "react-use";

const useConfirmBeforeLeave = (
  isConfirm: boolean | (() => boolean) = false,
  message = "Are you sure you want to leave? You have unsaved changes."
) => {
  useBeforeUnload(isConfirm, message);

  useEffect(() => {
    const finalConfirm =
      typeof isConfirm === "function" ? isConfirm() : isConfirm;
    const handler = () => {
      if (finalConfirm && !window.confirm(message)) {
        throw new Error("Route cancelled.");
      }
    };

    Router.events.on("routeChangeStart", handler);

    return () => {
      Router.events.off("routeChangeStart", handler);
    };
  }, [isConfirm, message]);
};

export default useConfirmBeforeLeave;
