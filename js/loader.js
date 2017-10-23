const SERVER_URL = `https://es.dump.academy/text-quest`;

export default class Loader {
  static loadData() {
    return fetch(`${SERVER_URL}/quest`).then((res) => res.json());
  }
}
