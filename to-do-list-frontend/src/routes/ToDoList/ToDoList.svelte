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
    {#each tasks as task (task.id)}
      <Task {task} onDelete={deleteTask} onUpdate={updateTask} />
    {/each}
  {:else}
    <p>No hay tareas disponibles.</p>
  {/if}
</div>

<style>
  /* Contenedor de las tareas */
  .task-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 30px;
  padding: 20px;
  grid-auto-rows: minmax(250px, auto); /* Ensure rows have a minimum height */
  align-items: start;
}

.task {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 250px; /* Fixed height to maintain consistent card size */
  overflow: hidden; /* Prevent overflow of content */
}

.task h2 {
  margin: 0 0 8px;
  font-size: 1.25rem;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.task p {
  margin: 0 0 16px;
  color: #666;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

  .task button {
    background-color: #007bff;
    border: none;
    color: white;
    padding: 8px 12px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.875rem;
    margin-top: auto;
    transition: background-color 0.3s ease;
    width: 100%;
  }

  .task button:hover {
    background-color: #0056b3;
  }

  .completed {
    background-color: #d4edda;
    border-color: #c3e6cb;
    color: #155724;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  .completed button {
    background-color: #4cc756;
  }

  .completed button:hover {
    background-color: #2e5732;
  }

  /* Estilos para el contenedor de input */
  .input-container {
    display: flex;
    justify-content: center;
    gap: 10px;
    padding: 20px;
  }

  .input-container input {
    padding: 10px;
    border-radius: 4px;
    border: 1px solid #ccc;
    font-size: 1rem;
    width: 200px;
  }

  .input-container button {
    background-color: #28a745;
    border: none;
    color: white;
    padding: 5px 5px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
  }

  .input-container button:hover {
    background-color: #218838;
  }

  h2 {
    text-align: center;
    margin-top: 20px;
  }
</style>