<template>
  <div class="condition-group">
    <!-- 待选条件 -->
    <div class="condition-configs">
      <template v-for="config in configs">
        <ConditionRow
          v-show="!config.hide"
          :key="config.value"
          :config="config"
          @change="handleChange"
        />
      </template>
    </div>

    <!-- 已选条件 -->
    <div class="condition-seleted">
      <ConditionRow
        v-show="showSelected"
        type="selected"
        :config="selectedConfig"
        @change="handleChange"
      />
    </div>

  </div>
</template>

<script>
import ConditionRow from './condition-row.vue';
import ConditionUtil from './condition-util.js';

export default {
  name: 'ConditionGroup',

  props: {
    // {label, value, options}
    configs: { type: Array },
  },

  components: { ConditionRow },

  data() {
    return {
      selectedConfig: {
        label: '已选择',
        value: 'selected',
        options: [],
      },
    };
  },

  computed: {
    showSelected() {
      return (
        this.selectedConfig.options.filter((option) => {
          return option.active;
        }).length > 0
      );
    },
  },

  methods: {
    // 初始化默认选中的选项
    initSelectedConfig() {
      for (let config of this.configs) {
        ConditionUtil.getActiveOptions(
          this.selectedConfig.options,
          config.options
        );
      }
    },

    removeSelectedItem(item) {
      // 如果在列表就移除
      let index = this.selectedConfig.options.findIndex((option) => {
        return option == item;
      });

      if (index > -1) {
        this.selectedConfig.options.splice(index, 1);
      }
    },

    handleChange(item, config) {
      // 已选中的变化只有一个操作就是删除
      this.removeSelectedItem(item);

      if (item && item.active) {
        this.selectedConfig.options.push(item);
      }

      this.$emit('change', item, this.configs);
    },
  },

  created() {
    this.initSelectedConfig();
  },
};
</script>

<style scoped>
>>> .condition-seleted .condition-options .condition-option.condition-active {
  background: #fff;
  color: #666;
  border: 1px solid #1c9a84;
  line-height: 16px;
}
</style>