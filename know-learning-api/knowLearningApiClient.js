/* This client should be consumed by calling like below.
The callback passed to watchSessions will be called whenever there is a new session,
so it only needs to be called once and will fit well with reactive programming approaches.

apiClient.watchSessions('abcd34', (err, sessions) => {
    console.log(err, sessions)
})

Sessions will an array of session objects of the form:
{
    name: 'Karel encounters a gigantic tree',
    participants: [  // Array of participant user ids
        'e', 'i', 'k',
        'a', 'k', 'i',
        'd', 'k', 'a'
    ],
    date: 37473847777 // timestamp ms since epoch
}
*/

import getRandomInt from "../src/motif/helpers/getRandomInt";

const adjectives = [
  "country",
  "wonky",
  "spooky",
  "spartan",
  "fluffy",
  "turquise",
  "suburban",
  "turtle infested",
  "gigantic",
];
const verbs = ["in the", "encounters a", "travels through a", "avoids the"];
const nouns = [
  "dinosaur",
  "skyscraper",
  "tree",
  "maze",
  "lake",
  "island",
  "spaceship",
  "pigsty",
];

const random = (arr) => arr[Math.floor(arr.length * Math.random())];
const generateName = () =>
  `Karel ${random(verbs)} ${random(adjectives)} ${random(nouns)}`;
const allParicipants = "abcdefghijklmnop".split("");
const generateParticipants = () => {
  const participants = [];
  for (let i = Math.round(Math.random() * 10 + 6); i > 0; i--) {
    participants.push(random(allParicipants));
  }
  return participants;
};

function generateSession() {
  // timestamp for random time between now and a year ago
  let timestamp = parseInt(
    Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 365
  );

  return {
    name: generateName(),
    participants: generateParticipants(),
    date: timestamp,
    id: getRandomInt(5000).toString(),
  };
}

const MAX_FAKE_SESSIONS = 16;

const apiClient = {
  watchSessions(teacherId, callback) {
    const updateCallback = () => {
      callback(
        null,
        Array(MAX_FAKE_SESSIONS)
          .fill()
          .map(() => generateSession())
      );
    };
    updateCallback();
  },
};

// For Testing / Demo
// apiClient.watchSessions('abcd34', (err, sessions) => {
//     console.log(err, sessions)
// })

export default apiClient;
