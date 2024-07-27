import { extendTheme } from "@chakra-ui/react";

const theme = {
  colors: {
    brand: {
      50: "#e4f0ff",
      100: "#b8d4ff",
      200: "#8ab9ff",
      300: "#5c9dff",
      400: "#2e82ff",
      500: "#0068e6",
      600: "#0051b4",
      700: "#003983",
      800: "#002251",
      900: "#000b21",
    },
  },
  styles: {
    global: {
      body: {
        bg: "black",
        color: "gray.800",
        overflowY: "hidden",
      },
      a: {
        color: "brand.500",
        _hover: {
          textDecoration: "underline",
        },
      },
    },
  },
  fonts: {
    heading: "Atop-R99O3, sans-serif",
    body: "'Roboto', sans-serif",
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: "normal",
        textTransform: "uppercase",
      },
      sizes: {
        md: {
          h: "48px",
          fontSize: "lg",
          px: "24px",
        },
      },

      defaultProps: {
        size: "md",
        variant: "solid",
        colorScheme: "brand",
      },
    },
  },
};

export default extendTheme(theme);
