const express = require("express");
const app = express.Router();
const queriesMessages = require("../mysql/queriesMessages");
const pConnection = require("../mysql/connection");
// const { addNewMessage } = require("../mysql/queriesMessages");

// add a message
app.post("/", async (req, res) => {
	const { user_id, foreign_id, content } = req.body;
	try {
		const result = await pConnection(
			queriesMessages.addNewMessage(user_id, foreign_id, content)
		);
		res.send({ status: 1 });
	} catch (error) {
		res.send({ status: 0 });
	}
});

// delete a message
app.delete("/:id", async (req, res) => {
	try {
		const result = await pConnection(
			queriesMessages.deleteMessage(req.params.id)
		);
		res.send({ status: 1 });
	} catch (error) {
		res.send({ status: 0 });
	}
});

// block a user
app.post("/blocked", async (req, res) => {
	try {
		const result = await pConnection(
			queriesMessages.blockUser(req.body.user_id, req.body.foreign_id)
		);
		res.send({ status: 1 });
	} catch (error) {
		res.send({ status: 0 });
	}
});

// pull all messages for a user
app.get("/:user_id", async (req, res) => {
	try {
		const result = await pConnection(
			queriesMessages.getUserMessages(req.params.user_id)
		);
		res.send({ status: 1, payload: result });
	} catch (error) {
		res.send({ status: 0 });
	}
});

module.exports = app;