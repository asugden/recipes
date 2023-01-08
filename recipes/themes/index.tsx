import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: "Montserrat, sans-serif",
    body: "Esteban, serif",
    mono: "Inconsolata, monospace",
    altheading: "Oswald, sans-serif",
  },

  fontWeights: {
    light: 300,
    regular: 400,
    title: 500,
    strong: 600, // Inconsolata bold
    bold: 700, // Montserrat bold
  },

  components: {
    FormLabel: {
      baseStyle: {
        marginTop: "15px",
        textTransform: "uppercase",
        fontSize: "0.75rem",
        fontFamily: "heading",
      },
    },
  },
});

export default theme;
