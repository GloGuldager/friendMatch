// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// ===============================================================================

var friendData = require("../data/friends.js");

// ===============================================================================
// ROUTING
// ===============================================================================


//STILL NEED TO WORK ON THIS. AFTER FIRST USER, ADDITIONAL USER SCORES ARE ADDING TO THE FIRST USER INSTEAD OF TO A UNIQUE ARRAY OF SCORES.//

module.exports = function (app) {

    // ---- Get a json list of all friends completed survey (and test data) ----
    app.get("/api/friends", function (req, res) {
      res.json(friendData);
    });

    // ---- POST result for each friend from survey ----
    app.post("/api/friends", function (req, res) {
      console.log("survey has been submitted")


      var surveyInput = req.body;
      res.json(true);
      console.log("\nName: " + surveyInput.name + "\nPhoto: " +
        surveyInput.photo + "\nScores: " + surveyInput.answers);

  // The split() method is used to split a string into an array of substrings, and returns the new array.
      surveyInput.answers = surveyInput.answers.split(",");

      friendData.push(surveyInput);

      // define function to change format of survey answers from strings
      convertAnswers(surveyInput);
      // console.log(friendInput.answers);

      compareFriends(friendData, surveyInput);

    });
  }

    // Constructor function for building friend objects using the
    // name, photo link, and an array of the answers
    function NewFriend(name, photo, answers) {
      this.name = name;
      this.photo = photo;
      this.answers = answers;
    }

    // Function to change format of survey answers from strings
    function convertAnswers(currentFriend) {
      // variable to hold the current friend
      var current = currentFriend;
      // console.log(current);

      // variable to hold current answers
      var curAnswers = current.answers;

      // converts answers from strings to numbers
      for (i = 0; i < curAnswers.length; i++) {
        curAnswers[i] = parseInt(curAnswers[i]);
      }

    } // END convertAnswers()

    // Comparison function to compare the current friend's answers to those
    // of other friends in the list
    function compareFriends(allFriends, currentFriend) {

      // variables to hold different scores as match is found
      var curFriend = currentFriend.answers;
      var matchFriend;
      var matchScores = [];
      var matchScore = 0;
      var closestMatch;

      // for loop for each friend (excluding last added)...
      for (i = 0; i < allFriends.length - 1; i++) {
        // store all the scores in an array...
        matchFriend = allFriends[i].answers;
        console.log(matchFriend);

        // for each answer in an array...
        for (j = 0; j < matchFriend.length; j++) {
          // store the abs value of the difference between the answers of
          // the new friend and this friend in the array
          var qScore = Math.abs(curFriend[j] - matchFriend[j]);
          // the total match score is equal to the sum of all qScores
          matchScore += qScore;
        } // End of scoring for loop
        console.log(matchScore)

        // push this friends matchScore into an array
        matchScores.push(matchScore);
        // reset the matchScore to zero before moving to the next friend
        matchScore = 0;
        // curFriend = "";
      } // END of main for loop
      console.log(matchScores)

      // Find lowest score in matchScores array
      var lowestScore = Math.min(...matchScores);
      console.log(lowestScore);

      // find the index of the lowest score
      var matchIndex = matchScores.indexOf(lowestScore);
      console.log(matchIndex);
      // find the friend at this index in the allFriends array
      var bestMatch = allFriends[matchIndex];

      // add a new property to the current friend's object that holds the best match
      currentFriend.bestie = bestMatch;
      console.log(currentFriend);
    }
