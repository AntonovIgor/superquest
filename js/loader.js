const SERVER_URL = `https://es.dump.academy/text-quest`;

const DEFAULT_NAME = `zeckson`;

export default class Loader {
  static async loadData() {
    const response = await fetch(`${SERVER_URL}/quest`);
    return response.json();
  }

  static async loadResults(name = DEFAULT_NAME) {
    const response = await fetch(`${SERVER_URL}/stats/${name}`);
    return response.json();
  }

  static async saveResults(data, name = DEFAULT_NAME) {
    const requestSettings = {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': `application/json`
      },
      method: `POST`
    };
    return fetch(`${SERVER_URL}/stats/${name}`, requestSettings);
  }
}
