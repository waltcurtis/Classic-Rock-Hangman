# Overview
This project, word-search-game, has a **classic rock** theme.  The words to be guessed are the names of artists in this genre of music.

# Content
Main contents of this game are:
1. index.html -- the main web page of the game
2. style.css -- css file for stylizing the webpage
3. game.js -- the javascript code behind the functions on the webpage
4. artists.js -- a javascript data file of the artist objects to be used in gameplay (this *data javascript* is separate from the *code javascript* just to keep the code as small and clean as possible)
5. assets/songs -- clipped music for adding sound to the game [I need to return to this to determine if I have performed any copyright infringements by putting the game together using these song snippets]

# Game-play instructions
1. Guess a letter which might be within the artist's name (band or individual) and press that key 
2. If that letter does exist in the artist's name, the name will be updated with the letter in the positions where it is found
3. The letters guessed will be displayed as you play 
4. If you guess all the letters in the artist name, within 15 tries, you win
5. If you cannot guess the artist (by guessing all letters in their name) within 15 tries, you lose 

