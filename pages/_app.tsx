import "../styles/globals.css";
import type { AppProps } from "next/app";
import { DataContextProvider } from "../hooks/context";
import { useForm, FormProvider } from "react-hook-form";
import { MotionConfig } from "framer-motion";
import { springConfig } from "../hooks/utils";
import dynamic from "next/dynamic";

const store = {
  highlight: "D2",
};
function App({ Component, pageProps }: AppProps) {
  const methods = useForm();
  return (
    <DataContextProvider value={store}>
      <FormProvider {...methods}>
        <MotionConfig transition={springConfig}>
          <Component {...pageProps} />
        </MotionConfig>
      </FormProvider>
    </DataContextProvider>
  );
}

export default dynamic(() => Promise.resolve(App), {
  ssr: false,
});