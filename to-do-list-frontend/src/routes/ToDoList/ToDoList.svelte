<script>
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import Task from "./Task.svelte";
  import NewTask from "./NewTask.svelte";
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

  const saveNewTask = async (task) => {
    newTask = false;
    let newTaskSaved = await taskService.save(task);
    allTasks = [...allTasks, newTaskSaved];
  };

  const deleteTask = async (id) => {
    try {
      await taskService.deleteById(id);
      allTasks = allTasks.filter((t) => t.id !== id);
    } catch (error) {
      console.log(error);
    }
  };
</script>

<div class="box">
  <h2 class="fancy" style="border-color:{getRandomColor()}">
    Esta es una lista de tareas :D
  </h2>
  <div
    class="fancy plus float"
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

<NewTask
  {newTask}
  color={getRandomColor()}
  on:newTask={(e) => saveNewTask(e.detail)}
/>

<div class="box">
  {#each allTasks as task}
    <Task
      {...task}
      color={getRandomColor()}
      on:updateTask={(e) => updateTask(e.detail)}
      on:deleteTask={(e) => deleteTask(e.detail.id)}
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
    font-size: 50px;
    line-height: 25px;
  }
  .fancy {
    margin: 25px 10px;
    padding: 5px 20px;
  }
</style>
