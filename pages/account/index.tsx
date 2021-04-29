import { Heading } from "grommet";
import { useRouter } from "next/router";
import React from "react";

import { useAuth } from "../../lib/auth";
import HeroText from "../../src/organisms/hero-text/HeroText";
import { Theme } from "../../types/Theme";

const Page: React.FC = () => {
  const { auth, loading } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!auth && !loading) {
      router.push("/");
    }
  }, [auth, loading]);

  return (
    <HeroText
      title={
        <Heading
          textAlign={"start"}
          level={"1"}
          alignSelf={"stretch"}
          size="small"
          responsive={false}
          color={"dark"}
          margin={{ top: "medium", bottom: "medium" }}
        >
          {`Hi, ${auth?.name}`}
        </Heading>
      }
      variant={Theme.DARK}
    />
  );
};

export default Page;
