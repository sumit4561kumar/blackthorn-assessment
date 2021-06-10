var faker = require('faker');

var database = { events: [] };

for (var i = 1; i <= 20; i++) {
  const startDate = faker.date.soon(7);
  let endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + faker.datatype.number(7));

  database.events.push({
    id: i,
    image: faker.image.abstract(),
    title: faker.commerce.productName(),
    start: startDate,
    end: endDate,
    statue: faker.datatype.number(3),
    description: faker.lorem.sentences(2),
    address: faker.address.streetAddress(),
    price: faker.commerce.price(1, 1000),
    quantity: faker.datatype.number(100),
  });
}

console.log(JSON.stringify(database));
