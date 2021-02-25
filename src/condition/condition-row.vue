<template>

  <!-- 一行筛选项 -->
  <div
    class="condition-row"
    :class="{'condition-child-row': isChild}"
  >
    <div class="condition-title">{{config.label}}：</div>

    <div class="condition-content">
      <ConditionOptions
        :showActive="isSelected"
        :options="config.options"
        :type="config.type"
        @change="handleChange"
      />

      <!-- 子级筛选项 -->
      <template v-if="!config.hideOptions">
        <template v-for="option in config.options">
          <template v-if="option.options">
            <ConditionRow
              v-show="option == currentOption"
              type="child"
              :config="option"
              @change="$emit('change', $event)"
            />
          </template>
        </template>
      </template>
    </div>

  </div>

</template>

<script>
import ConditionOptions from './condition-options.vue';

const TYPE = {
  default: 'default',
  child: 'child',
  selected: 'selected',
};

export default {
  name: 'ConditionRow',

  props: {
    // {label, value, type, options}
    config: { type: Object },

    // 显示类型{default, child, selected}
    type: { type: String, default: '' },
  },

  components: { ConditionOptions },

  data() {
    return {
      currentOption: null,
    };
  },

  computed: {
    isChild() {
      return this.type == TYPE.child;
    },
    isSelected() {
      return this.type == TYPE.selected;
    },
  },

  methods: {
    handleChange(option, options) {
      // 如果有子分类
      if (option && option.active) {
        this.currentOption = option;
      } else {
        this.currentOption = null;
      }

      this.$emit('change', option, this.config);
    },
  },

  created() {
    // this.initOptions(this.options);
  },
};
</script>

<style scoped>
.condition-row {
  /* margin-bottom: 10px; */
  display: flex;
}

.condition-row .condition-title {
  margin-right: 10px;
  width: 70px;
  text-align: right;
}

.condition-child-row .condition-title {
  color: #666666;
  text-align: left;
}
</style>