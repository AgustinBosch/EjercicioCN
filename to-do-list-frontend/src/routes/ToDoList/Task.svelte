<script>
  import { createEventDispatcher } from "svelte";

  export let id;
  export let title;
  export let description;
  export let isComplete;
  export let color;

  const dispatch = createEventDispatcher();

  const colorComplete = "#9fcf44";
  const colorIncomplete = "#dd8430";

  const toggleTask = () => {
    isComplete = !isComplete;
    sendTaskToUpdate({ id, isComplete });
  };

  const sendTaskToUpdate = (task) => {
    dispatch("updateTask", task);
  };
</script>

<div
  class="task"
  style="border-color:{color}"
  on:click={toggleTask}
  on:keydown={toggleTask}
  role="button"
  tabindex="0"
>
  <div
    class="triangle"
    style="--color:{isComplete ? colorComplete : colorIncomplete}"
  ></div>
  <h3>{title}</h3>
  <span>{description}</span>
</div>

<style>
  .triangle {
    position: absolute;
    top: -0.5px;
    right: -0.5px;
    width: 0;
    height: 0;
    border-left: 25px solid transparent;
    border-top: 25px solid var(--color);
    border-top-right-radius: 7px;
  }
  .task {
    position: relative;
    padding: 5px 15px;
    border: 5px solid;
    border-radius: 10px;
    text-align: center;
    min-width: 120px;
    height: fit-content;
    background-color: white;
    cursor: pointer;
    transition:
      transform 0.3s ease,
      box-shadow 0.3s ease;
  }

  .task:hover {
    transform: translate3d(-5px, -5px, 0);
    box-shadow: 8px 8px 1px rgba(0, 0, 0, 0.2);
  }

  h3 {
    margin-bottom: 5px;
    margin-top: 0;
  }
</style>
