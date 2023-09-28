<template>
  <div id="app" class="flex flex-col justify-start items-center h-screen box-border">
    <div class="bg-cream rounded-lg p-5 w-full h-full flex flex-col items-center">
      <AddItem title="To-Do"/>
      <ListView/>
    </div>
  </div>
</template>

<script>
import AddItem from './components/AddItem.vue'
import ListView from './components/ListView'
import './main.css'

export default {
  name: 'App',
  components: {
    AddItem,
    ListView
  }
}
</script>

<style>

</style>
