<template>
  <div
    class="condition-options"
    :data-active="activeCount"
  >

    <ConditionOption
      :option="clearOption"
      @change="handleClearChange"
    />

    <!-- 只显示激活选项 -->
    <template v-if="showActive">
      <template v-for="option in options">

        <ConditionOption
          v-show="option.active"
          :key="option.value"
          :option="option"
          @change="handleChange"
        />
      </template>
    </template>

    <!-- 显示全部选项 -->
    <template v-else>
      <template v-for="option in options">
        <!-- 隐藏hide -->
        <ConditionOption
          v-show="!option.hide"
          :key="option.value"
          :option="option"
          @change="handleChange"
        />
      </template>
    </template>

  </div>
</template>

<script>
import ConditionOption from './condition-option.vue';

// 筛选类型
const TYPE = {
  multiple: 'multiple', // 多选
  single: 'single', // 单选
};

export default {
  name: 'ConditionOptions',

  props: {
    // 引用传递 {label, value, active}
    options: { type: Array },
    // multiple：多选(默认)，single：单选
    type: { type: String, default: 'multiple' },
    // 只显示激活选项
    showActive: { type: Boolean, default: false },
  },

  components: { ConditionOption },

  data() {
    return {
      clearOption: {
        label: '不限',
        value: '',
        active: true,
      },
    };
  },

  watch: {
    activeCount: {
      immediate: true,

      handler(val) {
        // 只显示活跃，只需要展示取消
        if (this.showActive) {
          this.clearOption.active = false;
          this.clearOption.label = '清空';
        } else {
          this.clearOption.active = val == 0;
        }
      },
    },
  },

  computed: {
    activeCount() {
      return this.options.filter((option) => {
        return option.active;
      }).length;
    },
  },

  methods: {
    /**递归重置子分类 */
    resetOption(option) {
      option.active = false;

      if (option.options) {
        for (let opt of option.options) {
          this.resetOption(opt);
        }
      }
    },

    // 单选模式,除了选中项本身，其他选项都要重置状态
    handleTypeSingle(option) {
      this.options
        .filter((item) => {
          return item != option;
        })
        .forEach((item) => {
          this.resetOption(item);
        });
    },

    handleChange(option) {
      if (option.active) {
        // 如果是单选，其他重置筛选项
        if (this.type == TYPE.single) {
          this.handleTypeSingle(option);
        } else {
        }
      } else {
        this.resetOption(option);
      }

      this.$emit('change', option, this.options);
    },

    handleClearChange() {
      for (let option of this.options) {
        this.resetOption(option);
      }

      this.$emit('change', null, this.options);
    },
  },

  created() {
    // this.initOptions(this.options);
  },
};
</script>

<style scoped>
.condition-options {
  margin-bottom: 10px;
}
</style>