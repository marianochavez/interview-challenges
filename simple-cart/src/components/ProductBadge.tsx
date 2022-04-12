import {Badge, Box} from "@chakra-ui/react";

interface Props {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  color?: string;
}

export const ProductBadge = ({text, color, className, style}: Props) => {
  return (
    <Box paddingLeft={3} paddingTop={3}>
      <Badge
        borderRadius="full"
        className={`${className}`}
        colorScheme={`${color ? color : "teal"}`}
        px="2"
        style={style}
      >
        {text ? text : "New"}
      </Badge>
    </Box>
  );
};
