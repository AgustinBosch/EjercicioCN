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

<h1>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perferendis modi blanditiis molestias aperiam, explicabo sequi possimus nemo fugit eaque ipsam voluptatem, optio itaque aliquid rerum? Reprehenderit nemo dolore eius praesentium.</h1>

<div>
  <Task />
</div>
