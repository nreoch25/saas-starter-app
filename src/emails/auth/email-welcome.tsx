import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

type EmailWelcomeProps = {
  toName: string;
  url: string;
};

const EmailWelcome = ({ toName, url }: EmailWelcomeProps) => {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="font-sans m-8 text-center">
          <Container>
            <Section>
              <Text>Hello {toName}, welcome to the SAAS Starter App.</Text>
            </Section>
            <Section>
              <Button href={url} className="bg-black rounded text-white p-2 m-2">
                Get Started
              </Button>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

EmailWelcome.PreviewProps = {
  toName: "Test User",
  url: "http://localhost:3000/sign-in",
} as EmailWelcomeProps;

export default EmailWelcome;
