import {
  Box,
  Button,
  Container,
  FormLabel,
  Heading,
  Input,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import * as chordMagic from "chord-magic";
import React from "react";
import { useForm } from "react-hook-form";
import Lottie from "react-lottie-player";
import ladyGuitarPlayerAnimation from "./assets/lady-guitar-player.json";

import "./App.css";

function App() {
  const [capo, setCapo] = React.useState(undefined);
  const [chordConversionArray, setChordConversionArray] = React.useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { chords, capo } = data;
    const halfSteps = capo;

    // transpose chords
    const chordArray = chords.trim().split(" ");
    const chordConversionArray = chordArray.map((chord) => {
      const parsedChord = chordMagic.parse(chord);
      const transposedChord = chordMagic.transpose(parsedChord, -halfSteps);
      return {
        desiredChord: chord,
        chordShape: chordMagic.prettyPrint(transposedChord),
      };
    });

    // set data to be used for results
    setCapo(halfSteps);
    setChordConversionArray(chordConversionArray);
  };

  return (
    <Box height="full">
      <Container textAlign="left" py="24">
        <Lottie
          loop
          animationData={ladyGuitarPlayerAnimation}
          play
          style={{ width: "100%", height: "auto" }}
        />
        <Heading as="h1" size="2xl" mb="6">
          Capo Chord Converter
        </Heading>
        <Text mb="8">
          Input the chords you want to play, and we will give you the chord
          shapes you should play for the capo you suggest
        </Text>
        {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* register your input into the hook by invoking the "register" function */}
          <FormLabel size="lg" fontWeight={"bold"}>
            Chords in the song:
          </FormLabel>
          <Input mb="5" placeholder="B G#m C Em" {...register("chords")} />

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

        {chordConversionArray.length > 0 && (
          <Box mt="16">
            <Heading as="h2" size="xl" mb="8">
              Result
            </Heading>
            <TableContainer>
              <Table variant="striped" colorScheme="purple">
                <Thead>
                  <Tr>
                    <Th>Chord</Th>
                    <Th>Chord shape on Capo {capo}</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {chordConversionArray.map(({ desiredChord, chordShape }) => (
                    <Tr key={desiredChord}>
                      <Td>{desiredChord}</Td>
                      <Td>{chordShape}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default App;
