<script>
  import { onMount } from "svelte";
  import Task from "./Task.svelte";
  import taskService from "./taskService";

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

  onMount(async () => {
    cargarInformacion();
  });

  const cargarInformacion = async () => {
    allTasks = await taskService.getAll();
    console.log(allTasks);
  };

  const getRandomColor = () => {
    let index = Math.floor(Math.random() * (colors.length - 1));
    return colors[index];
  };
</script>

<div class="box">
  <h2 class="fancy" style="border-color:{getRandomColor()}">
    Esta es una lista de tasks
  </h2>
</div>

<div class="box">
  {#each allTasks as task}
    <Task {...task} color={getRandomColor()} />
  {/each}
</div>

<style>
  .box {
    display: flex;
    justify-content: center;
    gap: 10px;
    flex-wrap: wrap;
  }
  .fancy {
    padding: 5px 20px;
    background-color: white;
    border: 3px solid;
    border-radius: 10px;
  }
</style>
