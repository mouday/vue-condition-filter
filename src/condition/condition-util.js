/**
 * 收集已选中项目
 * @param {*} list
 * @param {*} options
 */
function getActiveOptions(list, options) {
  for (let option of options) {
    if (option.active) {
      list.push(option);
    }

    if (option.options) {
      getActiveOptions(list, option.options);
    }
  }
}

function getCondition(data, config) {
  // 直接值别名
  let value = config.alias || config.value;

  if (!Array.isArray(data[value])) {
    data[value] = [];
  }

  for (let option of config.options) {
    if (option.active) {
      data[value].push(option.value);
    }

    if (option.options) {
      getCondition(data, option);
    }
  }
}

/**
 * 获取筛选条件结果
 * @param {*} configs
 */
function getConditions(configs) {
  let data = {};

  for (let config of configs) {
    getCondition(data, config);
  }

  return data;
}

/**
 * 完成深拷贝
 * @param {any} obj
 */
function deepCopy(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * 合并配置
 */
function mergeConfig(configs, setting) {
  let config = getConfig(configs, setting);

  // 遍历对象属性
  for (let [key, val] of Object.entries(setting)) {
    // 递归处理options
    if (key == "options") {
      if (val) {
        for (let option of val) {
          mergeConfig(config.options, option);
        }
      }
    } else {
      config[key] = val;
    }
  }
}

/**
 * 获取配置项
 * @param {*} configs
 * @param {*} setting
 */
function getConfig(configs, setting) {
  for (let config of configs) {
    if (config.value == setting.value) {
      return config;
    }
  }

  throw new Exception("config not found: " + value);
}

/**
 * 按照指定筛选项返回筛选配置
 */
export function getConfigs(configs, settings) {
  let tempConfigs = deepCopy(configs);

  if (settings) {
    for (let setting of settings) {
      mergeConfig(tempConfigs, setting);
    }
  }

  return tempConfigs;
}

export default {
  deepCopy,
  getConditions,
  getConfigs,
  getActiveOptions,
};
