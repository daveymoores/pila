//  TODO: check pull request https://github.com/daveymoores/pila/pull/31 for old features we might want to put back in
const getAccountServerSideProps = async () => {
  return {
    props: {
      data: {
        name: "PILA Demo",
        greeting: "Hello",
      },
    },
  };
};

export default getAccountServerSideProps;
