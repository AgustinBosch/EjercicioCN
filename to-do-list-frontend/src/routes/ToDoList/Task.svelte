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
  const handleDelete = (e) => {
    e.stopPropagation();
    dispatch("deleteTask", {id});
  };
</script>

<div
  class="task fancy float"
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
  <button
    type="button"
    class="delete"
    style="--color:{color}"
    on:click={handleDelete}
  ></button>
  <h3>{title}</h3>
  <span>{description}</span>
</div>

<style>
  .delete {
    width: 25px;
    height: 25px;
    background-color: var(--color);
    border: none;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    position: absolute;
    top: 5px;
    left: 5px;
  }

  .delete::before,
  .delete::after {
    content: "";
    position: absolute;
    width: 60%;
    height: 2px;
    background-color: white;
  }

  .delete::before {
    transform: rotate(45deg);
  }

  .delete::after {
    transform: rotate(-45deg);
  }

  .delete:hover {
    background-color: #f55;
  }

  .delete:active {
    background-color: #f55;
  }
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
    text-align: center;
    min-width: 120px;
    height: fit-content;
  }

  h3 {
    margin-bottom: 5px;
    margin-top: 0;
  }
</style>
