const fs = require('fs');

// Функція для зчитування JSON-даних з файлу
function readJSONFile(filename, callback) {
  fs.readFile(filename, 'utf8', (err, data) => {
    if (err) {
      return callback(err, null);
    }

    try {
      const jsonData = JSON.parse(data);
      callback(null, jsonData);
    } catch (error) {
      callback(error, null);
    }
  });
}

// Функція для пошуку активу з найменшим значенням
function findMinAsset(data) {
  let minAsset = null;
  let minValue = Infinity;

  for (const entry of data) {
    const value = entry.value;
    if (value < minValue) {
      minValue = value;
      minAsset = entry.txt;
    }
  }

  return { asset: minAsset, value: minValue };
}

readJSONFile('data.json', (err, jsonData) => {
  if (err) {
    console.error('Помилка читання файлу:', err);
    return;
  }

  const { asset, value } = findMinAsset(jsonData);

  if (asset) {
    // Виводимо результат
    const output = `${asset}:${value}`;
    console.log(output);

    // Зберігаємо результат у файл 'output.txt'
    fs.writeFile('output.txt', output, (err) => {
      if (err) {
        console.error('Помилка збереження результату:', err);
      } else {
        console.log('Результат збережено у файлі output.txt');
      }
    });
  } else {
    console.log('Не знайдено жодного активу');
  }
});
