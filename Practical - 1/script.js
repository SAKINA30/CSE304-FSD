/// initialize votes object
let votes = {
    javaScript: 0,
    python : 0,
    java : 0
}

/// get dom elements
const jsCountE1 = document.getElementById("jsCount");
const pyCountE1 = document.getElementById("pyCount");
const javaCountE1 = document.getElementById("javaCount");


/// update function
function updateVotes () {
    jsCountE1.textContent = votes.javaScript;
    pyCountE1.textContent = votes.python;
    javaCountE1.textContent = votes.java;
}

/// vote function
function vote(lang) {
    votes[lang]++;
    updateVotes();
}


/// set interval function
setInterval(() => {
    const languages = ["javaScript" , "python" , "java"]
    const randomLang = languages[Math.floor(Math.random()*languages.length)];
    votes[randomLang]++;
    updateVotes();
},2000);

updateVotes();

