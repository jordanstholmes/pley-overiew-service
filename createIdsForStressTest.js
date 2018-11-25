const fs = require('fs');

const restaurantIds = [];
for (let i = 9999000; i <= 10000000; i += 1) {
  restaurantIds.push(`${i}`);
}

fs.writeFile('restaurantIds.csv', restaurantIds.join('\n'), (err) => {
  if (err) return console.error(err);
  console.log('Finished writing');
});
