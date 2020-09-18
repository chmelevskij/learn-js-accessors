import App from './App.svelte';
import * as recast from 'recast';

const line1 = 'animal.owners[0].address.postcode';
const line2 = `animal['owners'][0]['address']['postcode']`;

// console.log(parse(line1))
console.log(recast)

const app = new App({
	target: document.body,
	props: {
		name: 'world'
	}
});

export default app;
