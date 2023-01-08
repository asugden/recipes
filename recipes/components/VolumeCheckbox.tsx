import { Box, useRadio, useRadioGroup } from "@chakra-ui/react";
import { fractional } from "../src/fractional";

interface Props {
  sizes: number[];
  setVolume: () => void;
  frac: boolean;
  name: string;
}

// const computeAuthorWidth = (name: string): number => {};

function RadioCard(props: any) {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label" float="left" padding="3px">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          bg: "teal.600",
          color: "white",
          borderColor: "teal.600",
        }}
        px={3}
        py={2}
      >
        {props.children}
      </Box>
    </Box>
  );
}

const VolumeCheckbox = ({
  sizes,
  setVolume,
  frac,
  name,
}: Props): JSX.Element => {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: name,
    defaultValue: "0",
    // @ts-ignore
    onChange: setVolume,
  });
  const baseGroup = getRootProps();

  return (
    <Box {...baseGroup} width="100%">
      {sizes.map((numValue) => {
        const value = numValue.toFixed(3);
        const radio = getRadioProps({ value });
        return (
          <RadioCard key={value} {...radio}>
            {frac ? (
              <span
                dangerouslySetInnerHTML={{
                  __html: fractional(numValue),
                }}
              ></span>
            ) : (
              value
            )}
          </RadioCard>
        );
      })}
    </Box>
  );
};

export default VolumeCheckbox;
