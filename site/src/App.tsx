import React from "react";
import * as chordMagic from "chord-magic";
import {
  Box,
  Button,
  Container,
  FormLabel,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import "./App.css";

function App() {
  const [capo, setCapo] = React.useState(undefined);
  const [transposedChord, setTransposedChord] = React.useState(undefined);
  const [chord, setChord] = React.useState(undefined);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log("@@@ data", data);
    const { chord, capo } = data;
    const halfSteps = capo;
    setCapo(halfSteps);
    setChord(chord);
    const parsedChord = chordMagic.parse(chord);
    setTransposedChord(chordMagic.transpose(parsedChord, -halfSteps).root);
  };

  // const chord = chordMagic.parse("C"); // { root: 'A', quality: 'Major', extended: 'Dominant7' }
  // const halfSteps = 4;
  // const transposedChord = chordMagic.transpose(chord, halfSteps);

  // console.log(
  //   "@@@ reverse transpose",
  //   chordMagic.transpose(chordMagic.parse("E"), -4)
  // );

  // console.log("@@@ chord: ", chord);
  // console.log("@@@ transposedChord: ", transposedChord);
  // console.log(
  //   `To play an easier version of ${transposedChord.root}, move your capo to ${halfSteps}, and play ${chord.root}`
  // );

  return (
    <Box height="full">
      <Container textAlign="left">
        <Heading as="h1" size="2xl" mb="6">
          Capo Chord Converter
        </Heading>
        <Text mb="8">
          Paste your tabs into the text area. Choose the fret you want to capo
          on, and it will be converted below
        </Text>
        {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* register your input into the hook by invoking the "register" function */}
          <FormLabel size="lg" fontWeight={"bold"}>
            Chords in the song:
          </FormLabel>
          <Input mb="5" placeholder="B G#m C Em" {...register("chord")} />

          {/* include validation with required or other standard HTML validation rules */}
          <FormLabel size="lg" fontWeight={"bold"}>
            What capo do you want to play on?
          </FormLabel>
          <Input {...register("capo", { required: true })} />
          {/* errors will return when field validation fails  */}
          {errors.capo && <Text color="red.400">This field is required</Text>}

          <Button
            colorScheme="purple"
            mt="8"
            size="lg"
            type="submit"
            width={["full", null, "fit-content"]}
          >
            Submit
          </Button>
        </form>

        {transposedChord && (
          <Box mt="16">
            <Heading as="h2" size="xl">
              Result
            </Heading>
            <Text>
              To play {chord} on Capo {capo}, play {transposedChord}
            </Text>
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default App;
