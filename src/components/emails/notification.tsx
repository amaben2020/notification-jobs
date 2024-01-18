import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

export default function ViewedDocument({
  name,
}: {
  name: string | null | undefined;
}) {
  return (
    <Html>
      <Head />
      <Preview>See who visited your document</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans">
          <Container className="my-10 mx-auto p-5 w-[465px]">
            <Heading className="text-2xl font-normal text-center p-0 mt-4 mb-8 mx-0">
              <span className="font-bold tracking-tighter">Papermark</span>
            </Heading>
            <Heading className="mx-0 my-7 p-0 text-center text-xl font-semibold text-black">
              New Document Visitor
            </Heading>
            <Text className="text-sm leading-6 text-black">
              Your document was just viewed by someone.
            </Text>
            <Text className="text-sm leading-6 text-black">
              You can get the detailed engagement insights like time-spent per
              page and total duration for this document on Papermark.
            </Text>
            <Section className="my-8 text-center">
              <Button
                className="bg-black rounded text-white text-xs font-semibold no-underline text-center"
                href={`${process.env.NEXT_PUBLIC_BASE_URL}/documents`}
                style={{ padding: "12px 20px" }}
              >
                See my document insights
              </Button>
            </Section>
            <Text className="text-sm">
              Cheers,
              <br />
              The Papermark Team
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
