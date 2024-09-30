import { StrictMode } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import ReactDOM from "react-dom/client";

import { withErrorBoundary } from "react-error-boundary";

import App from "./app.jsx";
//import Login from "./pages/Login";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import "./index.css";

import theme from "./theme/theme";
import { AuthProvider } from "./components/Auth/AuthProvider.js";

function ErrorFallback({ error, resetErrorBoundary }) {
  //console.log({error, resetErrorBoundary });
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

const logErrorToService = (error, info) => {
  console.log({error, info});
};

const handleReset = () => {
  console.log('handleReset');
}

const AppWithErrorBoundary = withErrorBoundary(App, {
  FallbackComponent: ErrorFallback,
  onError: logErrorToService,
  onReset: handleReset,
  resetKeys: ['someKey']
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <AppWithErrorBoundary someKey={1} />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
