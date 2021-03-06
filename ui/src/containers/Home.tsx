import { Box } from "@chakra-ui/react";
import URLShortenerForm from "../components/URLShortenerForm";

function Home() {
  return (
    <Box
      height="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <URLShortenerForm />
    </Box>
  );
}

export default Home;
