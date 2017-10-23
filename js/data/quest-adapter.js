const preprocessAnswers = (answers) => {
  const answersObj = {};

  for (const {action, result} of answers) {
    const [actionName, description] = action.split(`.`);
    answersObj[actionName] = {
      description,
      result
    };
  }

  return answersObj;
};


export default (data) => {
  const adapted = {};

  Object.keys(data).forEach((it, i) => {
    adapted[`level-${i}`] = {
      text: data[it].text,
      answers: preprocessAnswers(data[it].answers)
    };
  });

  return adapted;
};
