<script>
  import { onMount } from "svelte";
  import Task from "./Task.svelte";
  import taskService from "./taskService";

  let tasks = [];
  let newTaskTitle = "";
  let newTaskDescription = "";

  

  onMount(async () => {
    await cargarInformacion();
  });

  const cargarInformacion = async () => {
    try {
      const response = await taskService.getAll();

      if (Array.isArray(response)) {
        tasks = response;
      } else {
        tasks = [];
      }
    } catch (error) {
      console.error("Error cargando las tareas", error);
      tasks = [];
    }
  };

  const addTask = async () => {
    try {
      const newTask = {
        title: newTaskTitle,
        description: newTaskDescription
        
      };
      const response = await taskService.save(newTask);
      console.log("Tarea creada:", response);
      await cargarInformacion();
      newTaskTitle = "";
      newTaskDescription = "";
    } catch (error) {
      console.error("Error añadiendo la tarea", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await taskService.deleteById(id);
      await cargarInformacion();
    } catch (error) {
      console.error("Error eliminando la tarea", error);
    }
  };

  const updateTask = async (id) => {
    try {
      const taskToUpdate = tasks.find(task => task.id === id);
      if (taskToUpdate) {
        taskToUpdate.isComplete = true;
        await taskService.update(id, taskToUpdate);
        await cargarInformacion();
      }
    } catch (error) {
      console.error("Error actualizando la tarea", error);
    }
  };
</script>

<h2>Lista de tareas</h2>

<input class="input-container" type="text" bind:value={newTaskTitle} placeholder="Título de la tarea" />
<input class="input-container input" type="text" bind:value={newTaskDescription} placeholder="Descripción de la tarea" />
<button class="input-container button"on:click={addTask}>Añadir Tarea</button>

<div class="task-container">
  {#if tasks.length > 0}
  {#each tasks as task, index (task.id)}
  <Task {task} {index} onDelete={deleteTask} onUpdate={updateTask} />
{/each}
  {:else}
    <p>No hay tareas disponibles.</p>
  {/if}
</div>

<style>
  
  .task-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 30px;
  padding: 20px;
  grid-auto-rows: minmax(250px, auto); 
  align-items: start;
}

  .input-container {
    display: flex;
    justify-content: center;
    gap: 10px;
    padding: 20px;
  }

  h2 {
    text-align: center;
    margin-top: 20px;
  }
</style>