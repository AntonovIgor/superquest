export const createElement = (template) => {
  const outer = document.createElement(`div`);
  outer.innerHTML = template;
  return outer;
};

const main = document.getElementById(`main`);

export const changeView = (element) => {
  main.innerHTML = ``;
  main.appendChild(element);
};
