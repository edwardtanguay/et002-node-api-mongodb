import * as model from './model.js';
import express from 'express';
import cors from 'cors';
import * as config from './config.js';

const app = express();
app.use(cors());

app.get('/', (req: express.Request, res: express.Response) => {
	req.
		res.send(model.getApiInstructions());
});

app.get('/employees', async (req: express.Request, res: express.Response) => {
	try {
		const employees = await model.getEmployees();
		res.json(employees);
	}
	catch (e) {
		res.status(500).send(e)
	}
});

app.listen(config.port, () => {
	console.log(`listening on port http://localhost:${config.port}`);
});