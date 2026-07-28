const { Firestore } = require("@google-cloud/firestore");
require("dotenv").config();

const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);

const firestore = new Firestore({
  projectId: CREDENTIALS.project_id,
  credentials: {
    client_email: CREDENTIALS.client_email,
    private_key: CREDENTIALS.private_key,
  },
});

const songs = firestore.collection("test-songs");

const createMenuItem = async (record) => {
  try {
    await songs.add(record);
    console.log("Records created.");
  } catch (error) {
    console.log(`Error at createRecord --> ${error}`);
  }
};

let database = require("./JSON/songs.json");

for (let index = 0; index < database.length; index++) {
  let element = database[index];
  element["isActive"] = true;
  createMenuItem(element);
}

// node item_create.js
