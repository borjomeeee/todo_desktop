export interface ITask {
  _id: string;
  planId: string;
  userId: string;
  text: string;
  checked: boolean;
}

export class Task implements ITask {
  _id: string;
  planId: string;
  userId: string;
  text: string;
  checked: boolean;

  constructor(task: ITask) {
    this._id = task._id;
    this.userId = task.userId;
    this.planId = task.planId;
    this.text = task.text;
    this.checked = task.checked;

    return this;
  }

  toggleCheck() {
    this.checked = !this.checked;
    return this;
  }

  setText(text: string) {
    this.text = text;
    return this;
  }
}
