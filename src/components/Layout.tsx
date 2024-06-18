import RQProviders from "../hooks/useQuery";
import "../index.css";
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <RQProviders>
      <section className="">
        {children}
      </section>
    </RQProviders>
  );
}
