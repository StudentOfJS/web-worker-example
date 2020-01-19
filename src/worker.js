import { expose } from 'comlink';
const obj = {
  counter: 1,
  inc() {
    this.counter++;
  },
  dec() {
    if (this.counter > 0) {
      this.counter--;
    }
  },
};

expose(obj);
