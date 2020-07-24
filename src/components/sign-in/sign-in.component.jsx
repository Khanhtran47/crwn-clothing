import React from "react";

import FormInput from "../form-input/form-input.componnent";
import CustomButton from "../custom-button/custom-button.component";

import { auth, signInWithGoogle } from "../../firebase/firebase.utils";

import { SignInContainer, SignInTitle, SignInButtons } from "./sign-in.styles";

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const { email, passowrd } = this.state;

    try {
      await auth.signInWithEmailAndPassword(email, passowrd);
      this.setState({ email: "", passowrd: "" });
    } catch (error) {
      console.log(error);
    }

    this.setState({ email: "", password: "" });
  };

  handleChange = (event) => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    return (
      <SignInContainer>
        <SignInTitle>I already have an account</SignInTitle>
        <span>Sign in with your email and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput
            name="email"
            type="email"
            value={this.state.email}
            label="email"
            handleChange={this.handleChange}
            required
          />
          <FormInput
            name="password"
            type="password"
            value={this.state.password}
            label="password"
            handleChange={this.handleChange}
            required
          />
          <SignInButtons>
            <CustomButton type="submit"> Sign In</CustomButton>
            <CustomButton onClick={signInWithGoogle} isGoogleSignIn>
              {" "}
              Sign in with Google{" "}
            </CustomButton>
          </SignInButtons>
        </form>
      </SignInContainer>
    );
  }
}

export default SignIn;
