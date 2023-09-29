import {
  Button,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  FormHelperText,
  Box,
  Snackbar,
  Alert,
  CircularProgress,
  Backdrop,
} from "@mui/material";
import {
  validateEmail,
  validatePassword,
  validateUsername,
} from "../helpers/validations";
import { useState } from "react";
import useApi from "../helpers/useApi";
import { Throttle } from "../helpers/utils";
function SignupForm(props) {
  const { showLoginPage } = props;
  const validations = {
    email: validateEmail,
    username: validateUsername,
    password: validatePassword,
    confirmPassword: validatePassword,
  };
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [signupForm, setSignupForm] = useState(newSignupForm());
  const [validationMessages, setValidationMessages] = useState(newSignupForm());
  const [loader, setLoader] = useState(false);
  const api = useApi();
  function newSignupForm() {
    return {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    };
  }
  const clearFields = () => {
    setSignupForm(newSignupForm());
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSignupForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
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
        tempValidationMessages[name] = validations[name](signupForm[name]);
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
  const submitLoginForm = async function (event) {
    try {
      debugger;
      setLoader(true);
      if (isFormValid() && arePasswordsSame()) {
        let response = await api.post(
          process.env.BACKEND_URL + "/createUser",
          signupForm
        );
        if (response.data.errorMessage) {
          setLoader(false);
          setOpenSnackbar(true);
          setSnackbarMessage(response.data.errorMessage);
          setSnackbarSeverity("error");
        } else {
          setOpenSnackbar(true);
          setSnackbarMessage(
            "Account Created Successfully! Welcome to Simply Online. To get started, please log in with your newly created credentials."
          );
          setSnackbarSeverity("success");
          clearFields();
          setTimeout(() => {
            showLoginPage();
          }, 4000);
        }
      }
      setLoader(false);
    } catch (e) {
      setLoader(false);
    }
  };
  const arePasswordsSame = () => {
    if (signupForm.password !== signupForm.confirmPassword) {
      setValidationMessages((prevValue) => ({
        ...prevValue,
        confirmPassword:
          "Passwords do not match. Please make sure the passwords in both fields are identical.",
      }));
      return false;
    }
    return true;
  };

  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);
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
        <h1 className="text-3xl font-bold">Sign up!</h1>
        <div className="flex gap-1 items-center justify-center">
          <span>Already have an account?</span>
          <Button type="text" onClick={showLoginPage}>
            Sign in
          </Button>
        </div>
        <div className="flex flex-col gap-4 w-full" onChange={validateField}>
          <FormControl required error={!!validationMessages.email}>
            <InputLabel htmlFor="email">Email</InputLabel>
            <OutlinedInput
              required
              name="email"
              id="email"
              label="Email"
              value={signupForm.email}
              onChange={handleInputChange}
            />
            <FormHelperText>{validationMessages.email}</FormHelperText>
          </FormControl>
          <FormControl required error={!!validationMessages.username}>
            <InputLabel htmlFor="username">Username</InputLabel>
            <OutlinedInput
              required
              name="username"
              id="username"
              label="Username"
              value={signupForm.username}
              onChange={handleInputChange}
            />
            <FormHelperText>{validationMessages.username}</FormHelperText>
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
              value={signupForm.password}
            />
            <FormHelperText>{validationMessages.password}</FormHelperText>
          </FormControl>
          <FormControl required error={!!validationMessages.confirmPassword}>
            <InputLabel htmlFor="confirm-password">Password</InputLabel>
            <OutlinedInput
              required
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              id="confirm-password"
              label="Password"
              onChange={handleInputChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowConfirmPassword}
                    edge="end"
                  >
                    <span className="material-symbols-outlined">
                      {showConfirmPassword ? "visibility_off" : "visibility"}
                    </span>
                  </IconButton>
                </InputAdornment>
              }
              value={signupForm.confirmPassword}
            />
            <FormHelperText>
              {validationMessages.confirmPassword}
            </FormHelperText>
          </FormControl>
          <Button variant="contained" onClick={submitLoginForm}>
            Create account
          </Button>
        </div>
      </div>
    </div>
  );
}
export default SignupForm;
