import { MongoClient } from 'mongodb';
import { IEmployee } from "./interfaces.js";
import * as config from './config.js';

const client = new MongoClient(config.mongoDbConnection);

const accessDatabase = async (done: (db: any) => void) => {
	await client.connect();
	const db = client.db('northwind');
	done(db);
};

export const getEmployees = (): any => {
	return new Promise((resolve, reject) => {
		try {
			accessDatabase(async (db) => {
				const employees = await db
					.collection('employees')
					.find({})
					.project({ firstName: 1, lastName: 1, _id: 0 })
					.toArray();
				if (employees.length > 0) {
					resolve(employees);
				} else {
					reject({
						status: "error",
						message: "bad collection name"
					})
				}
			});
		}
		catch (e) {
			reject(e);
		}
	});
}


export const getApiInstructions = () => {
	return `
<style>
	body {
		background-color: #444;
		padding: 1rem;
		color: #fff;
		font-family: courier;
	}
	code {
		background-color: #333;
	}
</style>
<h1>Book Site API</h1>
<ul>
	<li><code>/books</code> - all books</li>
	<li><code>/books/3</code> - book with id 3</li>
</ul>
	`;
}

