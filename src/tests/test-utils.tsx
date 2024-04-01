/* eslint-disable react/display-name */
import type { ReactElement, ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render as rtlRender } from "@testing-library/react";

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

function render(ui: ReactElement) {
  const testQueryClient = createTestQueryClient();
  const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={testQueryClient}>
      {children}
    </QueryClientProvider>
  );

  return { ...rtlRender(ui, { wrapper }), testQueryClient };
}

export * from "@testing-library/react";
export * from "@testing-library/user-event";
// override render method
export { render };
