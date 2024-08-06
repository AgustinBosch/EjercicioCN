<script>
  import { fade } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import { tweened } from "svelte/motion";
  import { createEventDispatcher } from "svelte";

  const containerHeight = tweened(0, {
    duration: 700,
    easing: quintOut,
  });

  const dispatch = createEventDispatcher();

  export let newTask = false;
  export let color;

  let height = 330;
  let errors = {};
  let touchedFields = {};
  let errorTitle;
  let errorDescription;

  let title = "";
  let description = "";

  $: result = {
    title,
    description,
  };

  $: errors = validate(touchedFields, result);
  $: newTask ? ($containerHeight = height) : ($containerHeight = 0);

  const validate = () => {
    const errors = {};
    errorTitle = undefined;
    errorDescription = undefined;
    if (touchedFields.title && title === "") {
      errors.title = "El titulo es requerido";
      errorTitle = errors.title;
    }
    if (touchedFields.description && description === "") {
      errors.description = "La descripción es requerida";
      errorDescription = errors.description;
    }
    return errors;
  };

  const validateAndSubmit = () => {
    touchedFields = { title: true, description: true };
    if (!Object.keys(errors).length) {
      onSubmit(result);
    }
  };

  const onSubmit = () => {
    dispatch("newTask", { title, description });
    formReset();
  };

  const formReset = () => {
    title = "";
    description = "";
    touchedFields = {};
    errors = {};
    errorTitle = undefined;
    errorDescription = undefined;
  };
</script>

<div style="height: {$containerHeight}px">
  {#if newTask}
    <div
      in:fade={{ duration: 200, delay: 100 }}
      out:fade={{ duration: 50 }}
      class="box"
    >
      <form class="fancy formulario" style="--bgcolor:{color}">
        <div class="form-input">
          <label for="title">Titulo</label>
          <input
            id="title"
            name="title"
            type="text"
            autocomplete="off"
            class:errorTitle
            on:blur={() => (touchedFields.title = true)}
            bind:value={title}
          />
          {#if errors.title}
            <span class="block error-text">{errors.title}</span>
          {/if}
        </div>
        <div class="form-input">
          <label for="description">Descripción</label>
          <input
            name="description"
            id="description"
            type="text"
            autocomplete="off"
            class:errorDescription
            on:blur={() => (touchedFields.description = true)}
            bind:value={description}
            error={errors.description}
          />

          {#if errors.description}
            <span class="block error-text">{errors.description}</span>
          {/if}
        </div>

        <button
          class="boton-bonito"
          type="button"
          style="border-color:{color}"
          on:click={validateAndSubmit}>guardar</button
        >
      </form>
    </div>
  {/if}
</div>

<style>
  .errorTitle,
  .errorDescription {
    border-color: #f55 !important;
  }

  .error-text {
    color: #f55;
  }
  .form-input {
    width: 300px;
    margin-bottom: 25px;
  }
  .formulario {
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    border-color: var(--bgcolor);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .formulario input[type="text"] {
    width: 100%;
    padding: 10px;
    border: 3px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
    transition: border-color 0.3s;
  }

  .formulario input[type="text"]:focus {
    border-color: var(--bgcolor);
    outline: none;
  }

  .boton-bonito {
    align-self: flex-end;
    width: fit-content;
    padding: 5px 10px;
    background-color: white;
    color: black;
    border: none;
    border: 3px solid;
    border-radius: 10px;
    cursor: pointer;
    font-size: 16px;
    font-family: cursive;
    transition:
      background-color 0.3s,
      transform 0.3s;
  }

  .boton-bonito:hover {
    transform: scale(1.05);
  }

  .boton-bonito:active {
    transform: scale(0.95);
  }
  .box {
    display: flex;
    justify-content: center;
  }
  .fancy {
    display: flex;
    flex-direction: column;
    padding: 20px;
  }
</style>
