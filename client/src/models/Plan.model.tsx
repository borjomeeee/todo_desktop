export interface IPlan {
  _id: string;
  userId: string;
  title: string;
  date: number;

  tasks: string[];
};

export class Plan implements IPlan {
  _id: string;
  userId: string;
  title: string;
  date: number;
  tasks: string[];

  constructor(plan: IPlan) {
    this._id = plan._id;
    this.userId = plan.userId;
    this.title = plan.title;
    this.date = plan.date;

    this.tasks = plan.tasks;

    return this;
  }

  addTask(task: string) {
    this.tasks.push(task);
    return this;
  }

  removeTask(taskId: string) {
    this.tasks = this.tasks.filter(task => task !== taskId);
    return this;
  }

  editTitle(title: string) {
    if (title.length > 0) {
      this.title = title;
    }
  }

  editDate(date: number) {
    this.date = date;
  }
};