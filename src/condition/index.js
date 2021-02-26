import ConditionGroup from "./condition-group.vue";
import ConditionUtil from "./condition-util.js";

const components = [
    ConditionGroup
];

// 注册组件
const install = function(Vue, options) {
  components.forEach(component => {
    Vue.component(component.name, component);
  });
};

/* 支持使用标签的方式引入 Vue是全局变量时，自动install */
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
  window.ConditionUtil = ConditionUtil;
}

export default {
  install,
  ConditionUtil,
  ConditionGroup
};
