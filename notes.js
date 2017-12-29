const fs = require('fs');

var fetchNotes = function() {
  try {
    var notes = JSON.parse(fs.readFileSync('data.json'));
    return notes;
  } catch (e) {
    return [];
  }
}

var saveNotes = function(notes) {
  fs.writeFileSync('data.json', JSON.stringify(notes));
}

var addNote = function(title, body) {
  var notes = [];
  var note = {
    title,
    body
  };
  notes = fetchNotes();

  var flag = false;
  notes.forEach(function(data) {
    if (data.title === title) flag = true;
  });

  if (flag === false) {
    notes.push(note);
    saveNotes(notes);
    return note;
  }
};

var getAll = function() {
  return fetchNotes();
};

var removeNote = function(title) {
  var notes = fetchNotes();
  var filtered = notes.filter((note) => note.title !== title);
  saveNotes(filtered);
  if (notes.length === filtered.length) return false;
  else return true;
}

var getNote = function(title) {
  var note = fetchNotes().filter((data) => data.title === title);
  return note[0];
}

var logNote = function(note) {
  console.log(`Title: ${note.title}\n   Body: ${note.body}`);
};

module.exports = {
  addNote,
  getAll,
  removeNote,
  logNote,
  getNote
};
