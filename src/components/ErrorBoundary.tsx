import { error } from "console";
import { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "./ui/button";
import Navbar from "./Navbar";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  errorMessage: string;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, errorMessage: "" };
  }

  static getDerivedStateFromError(_: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ errorMessage: error.message });
    console.log(error);
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="h-[100vh] flex items-center">
          <Navbar />
          <div className="text-black mt-[20px] lg:mt-[200px] dark:text-white flex flex-col justify-center items-center mx-auto ">
            <img src="/assets/EmptySearch.svg" />
            <h1 className=" text-[24px] md:text-[32px] lg:text-[48px] font-extrabold ">
              Sorry !! Something went wrong
            </h1>
            <span className="text-[16px] md:text-[20px] lg:text-[24px] ">
              {this.state.errorMessage}
            </span>

            <Button
              onClick={() => {}}
              variant="default"
              color="#b71824"
              className="button mt-3"
            >
              Back Home
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
