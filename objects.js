// Sample questions form the live session
const log = (line, data) => console.log(`${line}: ${JSON.stringify(data, null, 3)}\n`);

let animal = {
	species: "dog",
	gender: "male"
}
log(7, animal)

log(9, animal.species)
log(10, animal['gender'])

animal.owners = [];

log(15, animal);

animal.owners[0] = {name: "emil"}

log(18, animal)

log(20, animal['owners'])
log(21, animal['owners'][0])
log(22, animal['owners'][0]['name'])

log(24, animal.owners[0].name)

animal.owners[0].address = {postcode: "LT04337"}

log(28, animal)

log(30, animal['owners'][0]['address']['postcode'])

log(32, animal.owners[0].adress.postcode) 
