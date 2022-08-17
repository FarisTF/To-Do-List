require("dotenv").config(); 
const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const cors = require('cors');

mongoose.connect(
    process.env.MONGODB_URI, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

const KegiatanSchema = new mongoose.Schema({
    kegiatan: String,
    done : Boolean
  }, {
    versionKey: false
});

const Kegiatan = mongoose.model('Kegiatan', KegiatanSchema, 'kegiatan');

const app = express()

const PORT = process.env.PORT || 3000

app.use(jsonParser)
app.use(cors());
app.use(express.static('public'));

// Balikin file html dkk
app.get("/", async (request, response) => {
  const item = await Kegiatan.find({});

  try {
    response.send(item);
    console.log("get berhasil yey")
  } catch (error) {
    response.status(500).send(error);
  }
});

// Ambil semua kegiatan
app.get("/api", async (request, response) => {
    const item = await Kegiatan.find({});
  
    try {
      response.send(item);
      console.log("get berhasil yey")
    } catch (error) {
      response.status(500).send(error);
    }
  });

// Tambah kegiatan
app.post("/api", async (request, response) => {
    const item = new Kegiatan(request.body);
    console.log(request.body)
    console.log(item)
  
    try {
      await item.save();
      response.send(item);
      console.log("kegiatan berhasil ditambahkan")
    } catch (error) {
      response.status(500).send(error);
    }
});

// Update kegiatan
app.patch('/api/:id', async (request, response) => {
    try {
        const id = request.params.id;
        const updatedData = request.body;
        const options = { new: true };

        const result = await Kegiatan.findByIdAndUpdate(
            id, updatedData, options
        )

        response.send(result)
    }
    catch (error) {
        response.status(400).json({ message: error.message })
    }
})

// Delete kegiatan
app.delete('/api/:id', async (request, response) => {
  try {
      const id = request.params.id;
      const data = await Kegiatan.findByIdAndDelete(id)
      response.send(`Document with ${data.kegiatan} has been deleted..`)
  }
  catch (error) {
      response.status(400).json({ message: error.message })
  }
})

app.listen(PORT, () => console.log(`Server is running at ${PORT}`));