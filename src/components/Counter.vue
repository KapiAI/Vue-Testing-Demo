<template>
  <div>
    <h3>Counter.vue</h3>
    <div>
      <span class="num">{{ count }}</span>
      <button class="sync-button" @click="increment">自增</button>
      <button class="async-button" @click="incrementByAsync">异步自增</button>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        count: 0,
        foo: '',
      }
    },

    methods: {
      increment () {
        this.count++;
      },
      incrementByAsync () {
        window.setTimeout(() => {
          this.count++;
        }, 1000) 
      }
    }
  }
</script>