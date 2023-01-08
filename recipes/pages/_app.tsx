import { ChakraProvider } from "@chakra-ui/react";
import "@fontsource/esteban/400.css";
import "@fontsource/inconsolata/600.css";
import "@fontsource/montserrat/300.css";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/500.css";
import "@fontsource/montserrat/700.css";
// import "focus-visible/dist/focus-visible";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import theme from "../themes/index";
// import "../public/main.css";

const queryClient = new QueryClient();
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </ChakraProvider>
  );
}
