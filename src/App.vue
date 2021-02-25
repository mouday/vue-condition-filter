<template>
  <div>
    <ConditionGroup
      :configs="configs"
      @change="handleChange"
    />

  </div>
</template>

<script>
import Configs from './config.js';
import { ConditionGroup, ConditionUtil } from './condition/index.js';

export default {
  name: '',

  props: [],

  components: { ConditionGroup },

  data() {
    return {
      configs: [],

      settings: [
        {
          value: 'city',
          label: '大城市',
          alias: 'city-1', // 直接子类别名
          options: [
            {
              value: '深圳',
              hide: true,
            },
            {
              value: '上海',
              active: true,
            },
          ],
        },
      ],
    };
  },

  computed: {},

  methods: {
    async getData() {},

    getConditions() {
      return ConditionUtil.getConditions(this.configs);
    },

    handleChange(item, configs) {
      // console.log(item, configs);
      console.log(this.getConditions());
    },
  },

  created() {
    this.configs = ConditionUtil.getConfigs(Configs, this.settings);
    console.log(this.getConditions());
  },
};
</script>

<style scoped>
</style>