import { GetServerSidePropsContext } from "next";

//  TODO: check pull request https://github.com/daveymoores/pila/pull/31 for old features we might want to put back in
const getAccountServerSideProps = async (ctx: GetServerSidePropsContext) => {
  return {
    props: {
      data: {
        name: "Singapore Demo",
        greeting: "Hello"
      },
    },
  }
};

export default getAccountServerSideProps;
