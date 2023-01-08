import {
  Box,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
} from "@chakra-ui/react";
import { useState } from "react";
import { fractional } from "../src/fractional";

interface Props {
  setSliderVolume: (num: number) => {};
}

export default function VolumeSlider({ setSliderVolume }: Props) {
  const baseSizesDecimal = [
    0.125, 0.16666, 0.25, 0.33333, 0.5, 0.66666, 0.75, 1, 1.25, 1.33333, 1.5,
    1.66666, 1.75, 2, 2.25, 2.5, 2.75, 3,
  ];
  const [sliderValue, setSliderValue] = useState(7);

  const labelStyles = {
    mt: "2",
    ml: "-2.5",
    fontSize: "sm",
  };

  return (
    <Box>
      <Slider
        aria-label="slider-ex-6"
        onChange={(val) => {
          setSliderValue(val);
          setSliderVolume(baseSizesDecimal[val]);
        }}
        defaultValue={7}
        min={0}
        max={17}
        step={1}
      >
        <SliderMark value={4.2} {...labelStyles}>
          &frac12;
        </SliderMark>
        <SliderMark value={7.4} {...labelStyles}>
          1
        </SliderMark>
        <SliderMark value={13.3} {...labelStyles}>
          2
        </SliderMark>
        <SliderMark
          value={sliderValue}
          textAlign="center"
          bg="blue.500"
          color="white"
          mt="-10"
          ml="-5"
          w="12"
        >
          {
            <span
              dangerouslySetInnerHTML={{
                __html: fractional(baseSizesDecimal[sliderValue]),
              }}
            ></span>
          }{" "}
          oz
        </SliderMark>
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
    </Box>
  );
}
