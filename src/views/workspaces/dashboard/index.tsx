import React, { useState } from "react";
import {
  Grid,
  Card,
  Button,
  Typography,
  TextField,
  Link,
  Switch,
  FormControlLabel,
  IconButton,
} from "@mui/material";
import { Formik, Form, ErrorMessage, Field } from "formik";
import InputAdornment from "@mui/material/InputAdornment";
import cardStyle from "../../../theme/card-layout";

const Index = () => {
  return (
    <Grid container display="flex" alignItems="center" justifyContent="center">
      <Grid
        item
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Card sx={{ ...cardStyle }}>
          <Grid container p={2}>
            <Grid item xs={12}>
              <Card
                sx={{
                  textTransform: "none",
                  padding: "20px",
                  // marginBottom: "5vh",
                  backgroundColor: "#022C6B !important",
                  ...cardStyle,
                }}
              >
                <Grid
                  item
                  xs={12}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Typography variant="h4" color={"#FFFFF6"}>
                    Welcome!
                  </Typography>
                </Grid>
              </Card>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Index;
