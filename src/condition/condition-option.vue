<template>
  <span
    class="condition-option"
    :class="{'condition-active': option.active}"
    @click="handleClick"
  >{{option.label}}</span>
</template>

<script>
export default {
  name: 'ConditionOption',

  props: {
    // {label, value, [active]}
    option: { type: Object },
  },

  components: {},

  data() {
    return {};
  },

  methods: {
    getTime() {
      return new Date().getTime();
    },

    handleClick() {
      this.option.active = !this.option.active;
      // this.option.activeTime = this.getTime();
      this.$emit('change', this.option);
    },

    initOption() {
      // 确保有active属性
      if (typeof this.option.active == 'undefined') {
        this.$set(this.option, 'active', false); // 用于显示
        // this.$set(this.option, 'activeTime', this.getTime()); // 排序
      }
    },
  },

  created() {
    this.initOption();
  },
};
</script>

<style scoped>
.condition-option {
  padding: 3px 10px;
  background-color: #eeeeee;
  color: #333333;
  cursor: pointer;
  margin-right: 10px;
  display: inline-block;
}

.condition-active {
  background: #1c9a84;
  color: #fff;
}
</style>