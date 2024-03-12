import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SnackbarState {
  action: boolean;
  open: boolean;
  message: string;
  anchorOrigin: {
    vertical: string;
    horizontal: string;
  };
  variant: string;
  alert: {
    color: string;
    variant: string;
    severity: string;
    sx: Record<string, unknown>;
  };
  transition: string;
  close: boolean;
  actionButton: boolean;
}

const initialState: SnackbarState = {
  action: false,
  open: false,
  message: "Something went wrong",
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "right",
  },
  variant: "default",
  alert: {
    color: "primary",
    variant: "filled",
    severity: "success",
    sx: {},
  },
  transition: "Fade",
  close: true,
  actionButton: false,
};

interface OpenSnackbarPayload {
  open?: boolean;
  message?: string;
  anchorOrigin?: {
    vertical: string;
    horizontal: string;
  };
  variant?: string;
  alert?: {
    color: string;
    variant: string;
    severity: string;
    sx: Record<string, unknown>;
  };
  transition?: string;
  close?: boolean;
  actionButton?: boolean;
}

// ==============================|| SLICE - SNACKBAR ||============================== //

const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    openSnackbar(state, action: PayloadAction<OpenSnackbarPayload>) {
      const {
        open,
        message,
        anchorOrigin,
        variant,
        alert,
        transition,
        close,
        actionButton,
      } = action.payload;
      console.log("insnack", action.payload);
      state.action = !state.action;
      state.open = open ?? initialState.open;
      state.message = message ?? initialState.message;
      state.anchorOrigin = anchorOrigin ?? initialState.anchorOrigin;
      state.variant = variant ?? initialState.variant;
      state.alert = {
        color: alert?.color ?? initialState.alert.color,
        variant: alert?.variant ?? initialState.alert.variant,
        severity: alert?.severity ?? initialState.alert.severity,
        sx: alert?.sx ?? initialState.alert.sx,
      };
      state.transition = transition ?? initialState.transition;
      state.close = close === false ? close : initialState.close;
      state.actionButton = actionButton ?? initialState.actionButton;
    },

    closeSnackbar(state) {
      state.open = false;
    },
  },
});

export default snackbarSlice.reducer;

export const { closeSnackbar, openSnackbar } = snackbarSlice.actions;
