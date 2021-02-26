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
import condition from './condition/index.js';

export default {
  name: '',

  props: [],

  components: {
    ConditionGroup: condition.ConditionGroup,
  },

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
      return condition.ConditionUtil.getConditions(this.configs);
    },

    handleChange(item, configs) {
      // console.log(item, configs);
      console.log(this.getConditions());
    },
  },

  created() {
    console.log(condition);

    this.configs = condition.ConditionUtil.getConfigs(Configs, this.settings);
    console.log(this.getConditions());
  },
};
</script>

<style scoped>
</style>