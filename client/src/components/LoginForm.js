import {
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormHelperText,
  Box,
  Snackbar,
  Alert,
  CircularProgress,
  Backdrop,
} from "@mui/material";
import { parseJwt } from "../helpers/utils";
import {
  validateEmail,
  validatePasswordLength,
} from "../helpers/validations.js";
import useApi from "../helpers/useApi.js";
import { useState } from "react";
import { Throttle } from "../helpers/utils";
import { useNavigate } from "react-router-dom";
function LoginForm(props) {
  let navigate = useNavigate();
  const api = useApi();
  const { showSignupPage } = props;
  const [showPassword, setShowPassword] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [loader, setLoader] = useState(false);
  function newLoginForm() {
    return {
      email: "",
      password: "",
    };
  }
  const [loginForm, setLoginForm] = useState(newLoginForm());
  const [validationMessages, setValidationMessages] = useState(newLoginForm());
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLoginForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };
  const clearFields = () => {
    setLoginForm(newLoginForm());
  };
  const validations = {
    email: validateEmail,
    password: validatePasswordLength,
  };
  const validateField = (event) => {
    const { name, value } = event.target;
    if (name && validations[name]) {
      setValidationMessages((prevForm) => ({
        ...prevForm,
        [name]: validations[name](value),
      }));
    }
  };
  const validateAllFields = () => {
    let tempValidationMessages = {};
    Object.keys(validations).forEach((name) => {
      if (name && validations[name]) {
        tempValidationMessages[name] = validations[name](loginForm[name]);
      }
    });
    setValidationMessages(tempValidationMessages);
    return tempValidationMessages;
  };
  const isFormValid = () => {
    const tempValidationMessages = validateAllFields();
    const fields = Object.keys(tempValidationMessages);
    for (let i = 0; i < fields.length; i++) {
      if (tempValidationMessages[fields[i]]) {
        return false;
      }
    }
    return true;
  };
  const submitLoginForm = async (event) => {
    try {
      setLoader(true);
      if (isFormValid()) {
        let response = await api.post(
          process.env.BACKEND_URL + "/login",
          loginForm
        );
        debugger;
        if (!response.data.token) {
          setLoader(false);
          setOpenSnackbar(true);
          setSnackbarMessage("Invalid email or password");
          setSnackbarSeverity("error");
        } else {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("userdata", parseJwt(response.data.token));
          setOpenSnackbar(true);
          setSnackbarMessage("Success! You're now logged in.");
          setSnackbarSeverity("success");
          clearFields();
          setTimeout(() => {
            navigate("/");
          }, 1000);
        }
      }
      setLoader(false);
    } catch (e) {
      setLoader(false);
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  return (
    <div className="relative">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loader}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ width: 500 }}>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={() => {
            setOpenSnackbar(false);
          }}
        >
          <Alert
            onClose={() => {
              setOpenSnackbar(false);
            }}
            severity={snackbarSeverity}
            sx={{ width: "100%", minWidth: "300px" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
      <div className="flex items-center flex-col gap-4 max-w-sm w-full m-auto">
        <h1 className="text-3xl font-bold">Welcome back!</h1>
        <div className="flex flex-col gap-4 w-full" onChange={validateField}>
          <FormControl required error={!!validationMessages.email}>
            <InputLabel htmlFor="email">Email</InputLabel>
            <OutlinedInput
              required
              name="email"
              id="email"
              label="Email"
              defaultValue={loginForm.email}
              onChange={handleInputChange}
            />
            <FormHelperText>{validationMessages.email}</FormHelperText>
          </FormControl>
          <FormControl required error={!!validationMessages.password}>
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              required
              name="password"
              type={showPassword ? "text" : "password"}
              id="password"
              label="Password"
              onChange={handleInputChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    <span className="material-symbols-outlined">
                      {showPassword ? "visibility_off" : "visibility"}
                    </span>
                  </IconButton>
                </InputAdornment>
              }
              defaultValue={loginForm.password}
            />
            <FormHelperText>{validationMessages.password}</FormHelperText>
          </FormControl>
          <Button variant="contained" onClick={submitLoginForm}>
            Sign in
          </Button>
          <div className="flex gap-1 items-center justify-center">
            <span>Don't have an account yet?</span>
            <Button type="text" onClick={showSignupPage}>
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default LoginForm;
