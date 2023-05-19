import React from "react";
import {
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
  const [fret, setFret] = React.useState(undefined);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <>
      <Container textAlign="left">
        <Heading as="h1" size="2xl" mb="6">
          Capo Chord Converter
        </Heading>
        <Text mb="8">
          Paste your tabs into the text area. Choose the fret you want to capo
          on, and it will be converted below
        </Text>
        {/* /* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* register your input into the hook by invoking the "register" function */}
          <FormLabel size="lg" fontWeight={"bold"}>
            Chords in the song:
          </FormLabel>
          <Input mb="5" placeholder="B G#m C Em" {...register("example")} />

          {/* include validation with required or other standard HTML validation rules */}
          <FormLabel size="lg" fontWeight={"bold"}>
            What shape do you want to play?
          </FormLabel>
          <Input {...register("exampleRequired", { required: true })} />
          {/* errors will return when field validation fails  */}
          {errors.exampleRequired && <span>This field is required</span>}

          <Button mt="8" type="submit">
            Submit
          </Button>
        </form>
      </Container>
    </>
  );
}

export default App;
