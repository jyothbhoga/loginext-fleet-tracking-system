import React, { Component, type ReactNode } from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error: error,
      errorInfo: null,
    };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Uncaught error in component tree:", error, errorInfo);
    this.setState({ errorInfo });
  }

  private renderFallback = (): ReactNode => (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        textAlign: "center",
        maxWidth: 400,
        mx: "auto",
        mt: 5,
        border: "1px solid #e57373",
        bgcolor: "#ffebee",
      }}
    >
      <WarningAmberIcon color="error" sx={{ fontSize: 60, mb: 2 }} />
      <Typography variant="h5" color="error" gutterBottom>
        Application Error
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Something went wrong while rendering this section. Please try reloading
        the page.
      </Typography>

      {this.state.error && (
        <Box
          sx={{
            mt: 2,
            p: 1,
            bgcolor: "#f5f5f5",
            borderRadius: 1,
            textAlign: "left",
          }}
        >
          <Typography variant="caption" sx={{ display: "block" }}>
            **Error Message:** {this.state.error.message}
          </Typography>
          {process.env.NODE_ENV === "development" && (
            <Typography
              variant="caption"
              sx={{ display: "block", whiteSpace: "pre-wrap", mt: 1 }}
            >
              {this.state.errorInfo?.componentStack}
            </Typography>
          )}
        </Box>
      )}

      <Button
        variant="contained"
        color="primary"
        onClick={() => window.location.reload()}
        sx={{ mt: 3 }}
      >
        Reload Page
      </Button>
    </Paper>
  );

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || this.renderFallback();
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
