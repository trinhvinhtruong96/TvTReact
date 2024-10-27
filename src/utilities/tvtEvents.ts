type EventCallback<Data = {}> = (data: Data) => any;

class TvTEventGenerator<Event extends string> {
  private _events: Record<string, EventCallback[]> = {};

  constructor() {
    this._events = {};
  }

  on<Data>(events: Event, fct: EventCallback<Data>): this {
    events.split(", ").forEach((event) => {
      this._events[event] = this._events[event] || [];
      this._events[event].push(fct);
    });

    return this;
  }

  off<Data>(events?: Event, fct?: EventCallback<Data>): this {
    if (events === undefined) {
      this._events = {};

      return this;
    }

    events.split(" ").forEach((event) => {
      if (!(event in this._events)) {
        return;
      }

      if (fct) {
        this._events[event] = this._events[event].filter(
          (callback) => callback !== fct,
        );
      } else {
        this._events[event] = [];
      }
    });

    return this;
  }

  emit<Data>(event: Event, data: Data): any {
    if (this._events[event] === undefined) {
      return;
    }

    const tmpArray = this._events[event].slice();

    for (let i = 0; i < tmpArray.length; ++i) {
      const result = tmpArray[i].call(this, data);

      if (result !== undefined) {
        return result;
      }
    }

    return undefined;
  }
}

type ResizeEvent = "startResize" | "stopResize" | "resize";
const TvTFlexResizeEvent = new TvTEventGenerator<
  StringWithSuggestion<ResizeEvent>
>();

export { TvTFlexResizeEvent };
