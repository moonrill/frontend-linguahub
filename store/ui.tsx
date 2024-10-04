import {makeAutoObservable} from "mobx";

export class UIStore {
  title = "sup";

  constructor() {
    makeAutoObservable(this);
  }

  changeTitle(newTitle: string) {
    this.title = newTitle;
  }
}
