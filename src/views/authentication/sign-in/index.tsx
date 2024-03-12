import React, { useState } from "react";
import { useNavigate } from "react-router";
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
import { Visibility, VisibilityOff } from "@mui/icons-material";
import cardStyle from "../../../theme/card-layout";
import * as Yup from "yup";
import { AuthApis } from "../../../service/auth";
import { useNotification } from "../../../hooks/use-notifications";

const Index = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { notifySuccess, notifyError } = useNotification();
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  console.log("khsdbcjds", errorMessage);
  const [field, setFields] = useState([
    {
      label: "Email",
      fieldName: "email",
      placeholder: "Enter email",
      fieldType: TextField,
    },
    {
      label: "Password",
      fieldName: "password",
      placeholder: "Enter password",
      fieldType: TextField,
    },
  ]);

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Grid
        container
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
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
                    marginBottom: "5vh",
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
                      Sign in
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Typography variant="h6" color={"#FFFFF6"}>
                      Enter your email and password to Sign in
                    </Typography>
                  </Grid>
                </Card>
              </Grid>
              <Grid item xs={12}>
                <Formik
                  initialValues={{
                    email: "",
                    password: "",
                  }}
                  onSubmit={(data) => {
                    console.log("sjdnj", data);
                    const payload = {
                      email: data.email,
                      password: data.password,
                    };
                    AuthApis.signin(payload)
                      .then((response) => {
                        notifySuccess("Logged In Successfully!");
                        navigate("/dashboard");
                      })
                      .catch((error) => {
                        console.log("hgsvj", error);
                        setShowError(true);
                        setErrorMessage(error?.response?.data?.error);
                        notifyError(error?.response?.data?.error);
                      });
                  }}
                  validationSchema={validationSchema}
                  enableReinitialize
                >
                  {({ handleSubmit, resetForm }) => (
                    <Form>
                      <>
                        {field.map((field) => (
                          <>
                            <Typography
                              variant="subtitle1"
                              sx={{
                                marginBottom: "10px",
                              }}
                            >
                              {field?.label}
                            </Typography>
                            {field?.fieldName === "password" ? (
                              <Field
                                as={field?.fieldType}
                                variant="outlined"
                                fullWidth
                                key={field?.label}
                                type={showPassword ? "text" : "password"} // Ternary to show/hide password
                                style={{
                                  ...cardStyle,
                                  marginBottom: "10px",
                                }}
                                InputProps={{
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <IconButton
                                        onClick={handleTogglePasswordVisibility}
                                      >
                                        {!showPassword ? (
                                          <VisibilityOff />
                                        ) : (
                                          <Visibility />
                                        )}
                                      </IconButton>
                                    </InputAdornment>
                                  ),
                                }}
                                placeholder={field?.placeholder}
                                name={field?.fieldName}
                              ></Field>
                            ) : (
                              <Field
                                as={field?.fieldType}
                                variant="outlined"
                                fullWidth
                                key={field?.label}
                                style={{
                                  ...cardStyle,
                                  marginBottom: "10px",
                                }}
                                placeholder={field?.placeholder}
                                name={field?.fieldName}
                              ></Field>
                            )}
                            <ErrorMessage
                              name={field.fieldName}
                              component="div"
                              className="error-message"
                            />
                          </>
                        ))}
                        <FormControlLabel
                          control={<Switch />}
                          label="Remember me"
                        />
                        <Button
                          variant="contained"
                          fullWidth
                          sx={{ marginTop: 2 }}
                          onClick={() => {
                            handleSubmit();
                          }}
                        >
                          Sign in
                        </Button>
                      </>
                    </Form>
                  )}
                </Formik>
                {showError && (
                  <Typography
                    variant="h6"
                    sx={{
                      marginTop: "10px",
                      color: "red",
                      fontSize: "16px",
                    }}
                  >
                    {errorMessage}
                  </Typography>
                )}
              </Grid>
              <Grid
                item
                xs={12}
                display="flex"
                alignItems="center"
                justifyContent="center"
                mt={2}
              >
                <Typography variant="h6" sx={{ fontSize: "16px" }}>
                  Don't have an account?{" "}
                  <Link
                    style={{ textDecoration: "none", cursor: "pointer" }}
                    onClick={() => {
                      navigate("/signup");
                    }}
                  >
                    Sign up
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Index;
