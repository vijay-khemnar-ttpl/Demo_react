import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { openSnackbar } from "../Store/slices/snackbarSlices";

export const useNotification = () => {
  const dispatch = useDispatch();

  const notifyError = useCallback((message: string) => {
    dispatch(
      openSnackbar({
        open: true,
        message,
        variant: "alert",
        // alert: { color: "error" },
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const notifySuccess = useCallback((message: string) => {
    dispatch(
      openSnackbar({
        open: true,
        message,
        variant: "alert",
        // alert: { color: "success" },
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const notify = useCallback((message: string) => {
    dispatch(
      openSnackbar({
        open: true,
        message,
        variant: "alert",
        // alert: { color: "info" },
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    notifyError,
    notifySuccess,
    notify,
  };
};
