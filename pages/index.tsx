import Head from "next/head";
import Controller from "./components/Controller";
import TreeGraph from "./components/TreeGraph";

export default function Home() {
  return (
    <main>
      <div className="flex flex-col gap-4 container p-8 mx-auto">
        <Head>
          <title>Org chart demo</title>
        </Head>
        <section className="my-4">
          <h1 className="text-4xl font-semibold">Org chart demo</h1>
        </section>
        <section>
          <Controller />
        </section>
      </div>
      <section className="container mx-auto px-2 h-[60rem]">
        <TreeGraph layout="horizontal" />
      </section>
    </main>
  );
}
