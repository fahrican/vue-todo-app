<script lang="ts" setup>
import {ref, watch} from 'vue';

// Props
defineProps({
  title: String,
});

// Data
const search = ref("");
const firstname = ref("");
const age = ref("");

watch(search, async (newSearchValue) => {
  if (newSearchValue) {
    const response = await fetch('https://api.agify.io/?name=' + newSearchValue);
    const data = await response.json();
    age.value = data.age;
    firstname.value = data.name;
    search.value = '';
  }
});
defineExpose({
  search,
  firstname,
  age,
});
</script>

<template>
  <h1>{{ title }}</h1>
  <div class="card">
    <div style="width:400px;height:130px;margin-top:20px;border-style: dotted;">
      <br>
      <span>Firstmame: {{ firstname }}</span> <br>
      <span>Age: {{ age }}</span> <br>

    </div>
    <br><br>
    <label> Enter Firstname </label><br>
    <input type="text" v-model="search" style="font-size:20px;border-radius:10px;" placeholder=" Name ..."> <br> <br>
    <button type="button" @click="getAge">Guess Age</button>
    <br> <br> <br>
    <input type="radio" value="pop"> <label>Save my data</label>
  </div>
</template>
