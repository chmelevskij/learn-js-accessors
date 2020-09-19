<script lang="ts">
  import { eachField, namedTypes, visit } from "ast-types";
  import { parse } from "recast";
  import Ajv from "ajv";
  import exercises from "./exercises";

  let exercise = exercises[0];
  let content = "";
  let errorMessage = "";
  let currentQuestion = 0;
  let done = false;

  function handleSubmit() {
    if (!content) {
      errorMessage = "please provide some code";
      return;
    }
    try {
      errorMessage = "";
      let ast = parse(content);

      const validate = Ajv().compile(exercise.answerSchema.valueOf());
      if (validate(ast)) {
        currentQuestion += 1;
        console.log(currentQuestion);
        if (currentQuestion === exercises.length) {
          done = true;
          return;
        }
        exercise = exercises[currentQuestion];
        errorMessage = "";
      } else {
        errorMessage = "Check your answer";
        console.log(validate.errors);
      }
    } catch (error) {
      errorMessage = error.description;
    }
  }
</script>

<style>
  main {
    display: grid;
  }
  form {
    display: grid;
  }
  .error {
    color: hsl(340deg 82% 52%);
  }
</style>

<main>
  {#if done}
    <h2>done</h2>
  {:else}
    <div>{exercise?.description}</div>
    <div class="error">{errorMessage}</div>
  {/if}
  <form on:submit|preventDefault={handleSubmit}>
    <textarea rows="10" bind:value={content} />
    <input disabled={done} type="submit" />
  </form>
</main>
