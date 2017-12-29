const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const title = {
  describe: 'Title of note',
  demand: true,
  alias: 't'
};
const body = {
  describe: 'The body of the note, the core part.',
  demand: true,
  alias: 'b'
};

const argv = yargs.command('add', 'Add a new note', {
    title,
    body
  })
  .command('list', 'List all notes')
  .command('read', 'Read a note', {
    title
  })
  .command('remove', 'Remove a note', {
    title
  })
  .help().argv;
var command = argv._[0];

if (command === 'add') {
  var note = notes.addNote(argv.title, argv.body);
  if (note) {
    console.log("Note added successfully!");
    notes.logNote(note);
  } else {
    console.log("Note with duplicate title already exists!");
  }
} else if (command === 'list') {
  var list = notes.getAll();
  console.log('-------- NOTE LIST---------');
  list.forEach(function(data) {
    notes.logNote(data);
  });
  console.log('---------------------------');
} else if (command === 'read') {
  var note = notes.getNote(argv.title);
  if (note) {
    notes.logNote(note);
  } else {
    console.log('Note not found!');
  }
} else if (command === 'remove') {
  var removed = notes.removeNote(argv.title);
  var message = removed ? 'Note removed successfully!' : 'Note not found!';
  console.log(message);
} else {
  console.log('command not recognized');
}
