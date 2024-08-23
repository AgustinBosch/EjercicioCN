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

<h1>Titulo de la ver. nueva</h1>

<div>
  <Task />
</div>
