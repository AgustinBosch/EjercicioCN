<script>
  import { onMount } from "svelte";
  import Task from "./Task.svelte";
  import taskService from "./taskService";

  onMount(async () => {
    cargarInformacion();
  });

  const cargarInformacion = async () => {
    let all = await taskService.getAll();
    console.log(all);
  };
</script>

<h1>Esta es una lista de tasks</h1>

<div>
  <Task />
</div>
