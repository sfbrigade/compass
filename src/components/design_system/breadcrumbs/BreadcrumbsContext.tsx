import {
  createContext,
  useContext,
  useState,
  Dispatch,
  ReactNode,
  SetStateAction,
} from "react";

import type { Breadcrumb } from "./Breadcrumbs";

interface BreadcrumbsContextValue {
  breadcrumbs: Breadcrumb[] | undefined;
  setBreadcrumbs: Dispatch<SetStateAction<Breadcrumb[] | undefined>>;
}

const breadcrumbsContext = createContext<BreadcrumbsContextValue>({
  breadcrumbs: undefined,
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
  return (
    <breadcrumbsContext.Provider value={{ breadcrumbs, setBreadcrumbs }}>
      {children}
    </breadcrumbsContext.Provider>
  );
}
