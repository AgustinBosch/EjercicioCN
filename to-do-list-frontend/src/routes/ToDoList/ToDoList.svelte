<script>
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import Task from "./Task.svelte";
  import NewTask from "./NewTask.svelte";
  import taskService from "./taskService";
  import { accordion } from "./accordion";

  const colors = [
    "#a6c7ea",
    "#89bbde",
    "#6899aa",
    "#a9dbd2",
    "#8fcfb4",
    "#88bbaa",
    "#bbdcad",
    "#bbcab3",
    "#f9f18c",
    "#dfe88d",
    "#cbac8e",
    "#fbdddd",
    "#f8b2bd",
    "#f59597",
    "#f9a485",
    "#efa695",
    "#fdbd7d",
    "#ceb3d6",
    "#b3b3d9",
    "#c0c0c0",
  ];

  let allTasks = [];
  let newTask = false;

  onMount(async () => {
    cargarInformacion();
  });

  const cargarInformacion = async () => {
    allTasks = await taskService.getAll();
  };

  const getRandomColor = () => {
    let index = Math.floor(Math.random() * (colors.length - 1));
    return colors[index];
  };

  const updateTask = (task) => {
    taskService.update(task.id, task);
  };
</script>

<div class="box">
  <h2 class="fancy" style="border-color:{getRandomColor()}">
    Esta es una lista de tareas :D
  </h2>
  <div
    class="fancy plus"
    style="border-color:{getRandomColor()}"
    on:click={() => {
      newTask = !newTask;
    }}
    on:keydown={() => {
      newTask = !newTask;
    }}
    role="button"
    tabindex="0"
  >
    +
  </div>
</div>

<div use:accordion={newTask}>
  <div transition:fade={{ delay: 250, duration: 300 }}>
    <NewTask />
  </div>
</div>

<div class="box">
  {#each allTasks as task}
    <Task
      {...task}
      color={getRandomColor()}
      on:updateTask={(e) => updateTask(e.detail)}
    />
  {/each}
</div>

<style>
  .box {
    display: flex;
    justify-content: center;
    gap: 15px;
    flex-wrap: wrap;
  }
  .plus {
    cursor: pointer;
    transition:
      transform 0.3s ease,
      box-shadow 0.3s ease;
  }
  .plus:hover {
    transform: translate3d(-5px, -5px, 0);
    box-shadow: 8px 8px 1px rgba(0, 0, 0, 0.2);
  }
  .fancy {
    padding: 5px 20px;
    background-color: white;
    border: 5px solid;
    border-radius: 10px;
  }
</style>
