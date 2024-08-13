<script>
  import { onMount } from "svelte";
  import Task from "./Task.svelte";
  import taskService from "./taskService";

  let tasks = [];
  let newTaskTitle = "";
  let newTaskDescription = "";


  onMount(async () => {
    cargarInformacion();
  });

  const cargarInformacion = async () => {
    try {
      const response = await taskService.getAll();
      tasks = response.data; 
    } catch (error) {
      console.error("Error cargando las tareas", error);
    }
  };


const addTask = async () => {
  try {
    const newTask = { name: newTaskName };
    await taskService.save(newTask);
    await cargarInformacion();
    newTaskName = "";
  } catch (error) {
    console.error("Error añadiendo la tarea", error);
  }
};

</script>

<h1>Lista de tareas </h1>

<input type="text" bind:value={newTaskName} placeholder="Nueva tarea" />
<button on:click={addTask}>Añadir Tarea</button>

<div>
{#each tasks as task (task.id)}
  <Task {task} onDelete={deleteTask} onUpdate={updateTask} />
{/each}
</div>