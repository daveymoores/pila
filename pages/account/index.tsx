import { Box, Paragraph } from "grommet";
import nookies from "nookies";
import React from "react";

import getAccountServerSideProps from "../../next/get-server-side-props/account";
import Button from "../../src/atoms/button/Button";
import useNotification from "../../src/hooks/useNotification";
import AccountLayout from "../../src/organisms/account-layout/AccountLayout";
import Modal from "../../src/organisms/modal/Modal";
import { colorPalette } from "../../src/theme/pila";
import { SessionPageProps } from "./sessions";

const Page: React.FC<SessionPageProps> = (props) => {
  const { name, greeting, notification } = props.data;
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>();
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);

  useNotification(notification);

  const deleteUser = async () => {
    try {
      setLoading(true);
      await fetch("/api/user/delete", {
        method: "GET",
        headers: new Headers({ "Content-Type": "application/json" }),
        credentials: "same-origin",
      });
      nookies.set(undefined, "token", "", { path: "/" });
      location.reload();
    } catch (error) {
      setError(error);
      setLoading(false);
      console.error(error);
    }
  };

  const triggerDialog = () => setOpenDialog(true);
  const closeDialog = () => setOpenDialog(false);

  return (
    <AccountLayout
      greeting={`${greeting} ${name}`}
      title={"Account"}
      error={error}
      loading={loading}
    >
      {openDialog && (
        <Modal onClose={closeDialog}>
          <Paragraph margin={{ bottom: "medium" }}>
            Are you sure you want to delete your account?
          </Paragraph>
          <Button
            label={"Yes, delete my account"}
            color={colorPalette.redCrayola}
            primary
            onClick={deleteUser}
          />
        </Modal>
      )}
      <Box align={"start"}>
        <Button
          label={"Delete account"}
          color={colorPalette.redCrayola}
          primary
          onClick={triggerDialog}
        />
      </Box>
    </AccountLayout>
  );
};

export const getServerSideProps = getAccountServerSideProps;

export default Page;
