require('../../data/database');
const express = require('express');
const Note = require('../../models/note');
const router = express.Router();
const noteModel = require('../../models/note');


// api/notes/

/* Post new note */
router.post('/', async (req, res) => {
  const note = new Note({ ...req.body });

  try {
    await note.save();
    res.status(201).send(note);
  } catch (e) {
    res.status(400).send({ Error: `${e}` });
  }
});


/* GET all notes */
/* GET /notes?completed=false */
/* GET /notes?owner=Eden */
/* GET /notes?limit=10&skip=0 */
/* GET /notes?sortBy=createdAt:desc */

router.get('/', async (req, res) => {
  const match = {};
  const sort = {};

  if (req.query.completed) {
    match.completed = req.query.completed === 'true';
  }

  if(req.query.owner){
    match.owner = req.query.owner;
  }

  if(req.query.body){
    match.body = req.query.body;
  }

  if(req.query.title){
    match.title = req.query.title;
  }

  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(':');
    sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
  }


  try {
    const notes = await noteModel.find(match)
      .limit(parseInt(req.query.limit))
      .skip(parseInt(req.query.skip))
      .sort(sort);

    res.send(notes);
  } catch (e) {
    res.status(400).send({ Error: `${e}` });
  }
});

/* GET note by id */
router.get('/:id', async (req, res) => {
  try {
    const note = await noteModel.findById(req.params.id);
    if (!note) {
      res.status(404).send();
    }
    res.send(note);
  } catch (err) {
    res.status(500).send(err)
  }
});



/* Update note by id */
router.patch('/:id', async (req, res) => {
  const updates = Object.keys(req.body); 
  const allowedUpdates = ['body', 'title', 'completed'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(404).send({ error: 'Invalid updates!' })
  }

  try {
    const note = await noteModel.findById(req.params.id);
    if (!note) {
      return res.status(404).send()
    }

    updates.forEach((update) => note[update] = req.body[update])
    await note.save();
    res.send(note);
  } catch (e) {
    res.status(400).send({ Error: `${e}` });
  }
});

// Delete note by id
router.delete('/:id',  async (req, res) => {
  try {
      const note = await noteModel.findByIdAndDelete( req.params.id)
      if (!note) {
          return res.status(404).send()
      }
      res.send(note)
  } catch (e) {
      res.status(500).send()
  }
})
module.exports = router;
