import {
  createContext,
  useCallback,
  useContext,
  useState,
  Dispatch,
  ReactNode,
  SetStateAction,
} from "react";

import type { Breadcrumb } from "./Breadcrumbs";

interface BreadcrumbsContextValue {
  breadcrumbs: Breadcrumb[] | undefined;
  setInitialBreadcrumbs: Dispatch<SetStateAction<Breadcrumb[] | undefined>>;
  setBreadcrumbs: (breadcrumbs: Breadcrumb[] | undefined) => void;
}

const breadcrumbsContext = createContext<BreadcrumbsContextValue>({
  breadcrumbs: undefined,
  setInitialBreadcrumbs: () => undefined,
  setBreadcrumbs: () => undefined,
});

export function useBreadcrumbsContext() {
  return useContext(breadcrumbsContext);
}

interface BreadcrumbsContextProviderProps {
  children: ReactNode;
}

export function BreadcrumbsContextProvider({
  children,
}: BreadcrumbsContextProviderProps) {
  const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[] | undefined>();
  const setBreadcrumbsCallback = useCallback(
    (breadcrumbs: Breadcrumb[] | undefined) => {
      setTimeout(() => {
        setBreadcrumbs(breadcrumbs);
      }, 0);
    },
    [setBreadcrumbs]
  );
  return (
    <breadcrumbsContext.Provider
      value={{
        breadcrumbs,
        setInitialBreadcrumbs: setBreadcrumbs,
        setBreadcrumbs: setBreadcrumbsCallback,
      }}
    >
      {children}
    </breadcrumbsContext.Provider>
  );
}
