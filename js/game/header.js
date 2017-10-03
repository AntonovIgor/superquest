const drawHeart = (full) => {
  return `<span class="heart__${full ? `full` : `empty`}">${full ? `&#9829;` : `&#9825;`}</span>`;
};

export default (data) => {
  return `
<header class="header">
  <div>Мир: ${data.level}</div>
  <div>Жизни: ${drawHeart(data.lives > 2)}
              ${drawHeart(data.lives > 1)}
              ${drawHeart(data.lives > 0)}
  </div>
  <div>Время: ${data.time}</div>
</header>`;
};
