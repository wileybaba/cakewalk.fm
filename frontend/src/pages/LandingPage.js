import React from "react";
import HeroImage from "url:../assets/images/music_white.svg";
import {
  Box,
  AppBox,
  EmojiButton,
  SpacerContainer,
  AnimatedGradientText,
  HeroGrid,
  FlexContainer,
} from "../components/StyledComponents";
import { Nav } from "../components/Nav";
import * as themes from "../themes";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import request, { gql } from "graphql-request";
import { endpoint } from "../services";

export function LandingPage({ theme, setTheme, children }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onSubmit", reValidateMode: "onChange" });

  const subscribeMutation = useMutation(async ({ email }) => {
    const subscribedEmail = await request(
      endpoint,
      gql`
        mutation($email: String!) {
          subscribe(email: $email) {
            email
          }
        }
      `,
      { email: email }
    );
    return subscribedEmail;
  });

  const handleSubscribe = (formData) => {
    subscribeMutation.mutate(formData);
  };

  return (
    <FlexContainer>
      {children}
      <AppBox width="fit-content">
        <Nav />
        <HeroGrid>
          <SpacerContainer flexDirection="column">
            <div>
              <div>
                <AnimatedGradientText animate>
                  Internet radio
                </AnimatedGradientText>
                <AnimatedGradientText>
                  built for <strong>your</strong> community
                </AnimatedGradientText>
              </div>
              <h2>
                Radio is time tested entertainment that is here to stay.
                Cakewalk.fm is a new music community and internet radio platform
                that empowers artists, broadcasters, and listeners. Discover new
                music, ideas, and cultures. Get your music into peoples ears.
                Support your favorite artists. Broadcast your favorite music to
                the world, and get paid to do it. Welcome to the future of
                radio.
              </h2>
            </div>
            {!subscribeMutation.isSuccess && (
              <Box>
                <form onSubmit={handleSubmit(handleSubscribe)}>
                  <div className="input-with-button">
                    <input
                      type="text"
                      placeholder="Enter email address"
                      name="email"
                      {...register("email", {
                        required: "Please enter your email",
                        pattern: {
                          value: /(.+)@(.+){2,}\.(.+){2,}/,
                          message: "Please enter a valid email",
                        },
                      })}
                    />
                    <button className="basic">
                      {subscribeMutation.isLoading
                        ? "Loading..."
                        : "Get early access"}
                    </button>
                  </div>
                </form>
                {subscribeMutation.isError &&
                  subscribeMutation.error.response.errors.map((err) => (
                    <p key={new Date().getTime()} className="error">
                      {err.message}
                    </p>
                  ))}
                {errors.email && (
                  <p className="error">{errors.email.message}</p>
                )}
              </Box>
            )}
            {subscribeMutation.isSuccess && (
              <Box>
                <h3>
                  Thank you for your interest in our community. We are working
                  hard to build a product that you're going to love—talk soon.
                </h3>
              </Box>
            )}
          </SpacerContainer>
          <SpacerContainer flexDirection="column">
            <img
              src={HeroImage}
              style={{
                maxWidth: "95%",
                marginBottom: "1.5rem",
              }}
            />
            <Box>
              <SpacerContainer>
                <EmojiButton
                  active={theme.name === "flamingo"}
                  onClick={() => setTheme(themes.flamingoTheme)}
                >
                  🦩
                </EmojiButton>
                <EmojiButton
                  active={theme.name === "space"}
                  onClick={() => setTheme(themes.spaceTheme)}
                >
                  🌑
                </EmojiButton>
                <EmojiButton
                  active={theme.name === "siesta"}
                  onClick={() => setTheme(themes.siestaTheme)}
                >
                  🏖️
                </EmojiButton>
                <EmojiButton
                  active={theme.name === "deep blue"}
                  onClick={() => setTheme(themes.deepBlueTheme)}
                >
                  🧿
                </EmojiButton>
                <EmojiButton
                  active={theme.name === "spring"}
                  onClick={() => setTheme(themes.springTheme)}
                >
                  🌱
                </EmojiButton>
              </SpacerContainer>
            </Box>
          </SpacerContainer>
        </HeroGrid>
      </AppBox>
    </FlexContainer>
  );
}
