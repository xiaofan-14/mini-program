import type { TaskType } from 'src/type'
import { formatTime } from 'src/utils/util'

Component({
  options: {
    styleIsolation: 'shared'
  },
  properties: {
    tasks: {
      type: Array,
      value: [] as TaskType[],
    },
  },
  data: {
    list: [] as TaskType[],
  },

  // 监听 tasks 属性变化
  observers: {
    'tasks': function(tasks: TaskType[]) {
      if (!tasks) return;

      const formatted = tasks.map(task => ({
        ...task,
        createdAt: formatTime(task.createdAt),
        updatedAt: formatTime(task.updatedAt),
        deadline: task.deadline ? formatTime(task.deadline) : '',
      }));
      this.setData({ list: formatted });
    }
  }
});
