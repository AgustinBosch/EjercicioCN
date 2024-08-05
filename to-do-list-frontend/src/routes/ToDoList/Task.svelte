<script>
  export let id;
  export let title;
  export let description;
  export let isComplete;
  export let color;

  const colorComplete = "#9fcf44";
  const colorIncomplete = "#dd8430";

  const toggleTask = () => {
    isComplete = !isComplete;
    console.log(isComplete);
  };
</script>

<div
  class="task"
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
  <h3>{title}</h3>
  <span>{description}</span>
</div>

<style>
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
    border: 5px solid;
    border-radius: 10px;
    text-align: center;
    min-width: 120px;
    height: fit-content;
    background-color: white;
    transition: padding 0.5s ease;
    cursor: pointer;
  }

  .task:hover {
    padding: 15px 25px;
  }

  h3 {
    margin-bottom: 5px;
    margin-top: 0;
  }
</style>
