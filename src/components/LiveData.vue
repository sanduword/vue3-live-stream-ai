<template>
  <div class="live-data">
    <div class="ld-box">
      <div class="not nor-cols" v-show="state.not">正在识别数据...</div>
      <ul>
        <li v-for="(item, index) in state.labels" :key="index">
          <div class="tect-sacn" v-if="item.update"></div>
          <div class="ld-sin">
            <img src="../assets/analy.png">
            <div class="ld-sts">
              <h3>{{item.label}}</h3>
              <span class="ld-num">{{item.warn}}</span>
              <span class="ld-unit">处</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from 'vue'
import { WsLabel } from '../types/index'
export default defineComponent({
  name: 'LiveData',
  setup(props, content) {
    const state = reactive({
      not: true,
      labels: Array<WsLabel>()
    })

    const reviceLabels = (labels: Array<WsLabel>): void => {
      state.not = false
      state.labels = labels
    }

    return {
      state,
      reviceLabels
    }
  }
})
</script>