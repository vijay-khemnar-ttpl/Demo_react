import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Grid, Card, Button, Typography, TextField, Link } from "@mui/material";
import { Formik, Form, ErrorMessage, Field } from "formik";
import cardStyle from "../../../theme/card-layout";
import * as Yup from "yup";
import { AuthApis } from "../../../service/auth";

const Index = () => {
  const navigate = useNavigate();
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [field, setFields] = useState([
    {
      label: "Name",
      fieldName: "name",
      placeholder: "Enter name",
      fieldType: TextField,
    },
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
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long")
      .matches(
        /^(?=.*[a-z])/,
        "Password must contain at least one lowercase letter"
      )
      .matches(
        /^(?=.*[A-Z])/,
        "Password must contain at least one uppercase letter"
      )
      .matches(/^(?=.*\d)/, "Password must contain at least one number")
      .matches(
        /^(?=.*[@#$%^&+=])/,
        "Password must contain at least one symbol"
      ),
  });

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
                      Join us today
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
                      Enter your email and password to register
                    </Typography>
                  </Grid>
                </Card>
              </Grid>
              <Grid item xs={12}>
                <Formik
                  initialValues={{
                    name: "",
                    email: "",
                    password: "",
                  }}
                  onSubmit={(data) => {
                    console.log("sjdnj", data);
                    const payload = {
                      name: data.name,
                      email: data.email,
                      password: data.password,
                    };
                    AuthApis.signup(payload)
                      .then((response) => {
                        setShowError(true);
                        console.log("kjdjw", response);
                        setSuccessMessage(response?.data?.message);
                        setShowSuccess(true);
                        setShowError(false);
                        setTimeout(() => {
                          navigate("/");
                        }, 2000);
                        // notifySuccess("Alert Assigned Successfully!");
                      })
                      .catch((error) => {
                        console.log("sjdnj", data);
                        setShowError(true);
                        setShowSuccess(false);
                        if (
                          error?.response?.data?.error.includes("duplicate")
                        ) {
                          setErrorMessage("User Already Exists!");
                        } else {
                          setErrorMessage(error?.response?.data?.error);
                        }
                        // notifyError(error?.response?.data?.error);
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

                            <ErrorMessage
                              name={field.fieldName}
                              component="div"
                              className="error-message"
                            />
                          </>
                        ))}
                        <Button
                          variant="contained"
                          fullWidth
                          sx={{ marginTop: 2 }}
                          onClick={() => {
                            handleSubmit();
                          }}
                        >
                          Sign up
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
                {showSuccess && (
                  <Typography
                    variant="h6"
                    sx={{
                      marginTop: "10px",
                      color: "green",
                      fontSize: "16px",
                    }}
                  >
                    {successMessage}
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
                  Already have an account?{" "}
                  <Link
                    style={{ textDecoration: "none", cursor: "pointer" }}
                    onClick={() => {
                      navigate("/");
                    }}
                  >
                    Sign in
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
