function refreshWordCount() {
    $( "input" ).each(function( index ) {
        console.log($( '#'+$(this).attr('name')+'Count' ).text($(this).val().length))
      });
      
}

var blague = ["Quel super héros donne le plus vite l’heure? Speed heure man!",
"Hier j’ai raconté une blague sur Auchan mais elle a pas supermarché…",
"C’est 2 grains de sable qui arrivent à la plage: « Putain, c’est blindé aujourd’hui…",
"C'est 2 putes qui se disputent",
"C'est quoi le plus dur à mixer dans les légumes? Le fauteuil",
"Quel est le pays le plus cool du monde? Le Yémen.",
"C'est l'histoire d'une brioche qui n'allait jamais aux sports d'hiver parce qu'elle ne savait Pasquier",
"Pourquoi Napoléon n'a pas acheté une maison \? \n Parce qu'il avait déjà un bon appart (bonparte)",
"Les girafes, ça n'existe pas... Normal, c'est un cou monté !",
"C'est l'histoire d'un schtroumpf qui court, qui tombe... et qui se fait un bleu.",
"Une carotte veut se suicider. Hélas, elle échoue et puis se dit :- Zut, c'est râpé !",
"Qui est-ce qui court et qui se jette ? Une courgette.",
"Deux bonbons qui marchent sur la route. Un flic les arrête et dit : - Vos papiers s'il vous plaît !!",
"Un clown dit à son médecin : - Docteur, je me sens drôle...",
"Quelle est la plus intelligente, la blonde, la rousse ou la brune ? La rousse parce que c’est un dictionnaire.",
"Un jour Dieu dit à Casto de ramer. Et depuis, castorama..."
]





function checkAllField() {
    var valided = true;
    $( "small" ).each(function( index ) {
        if(parseInt($(this).text()) >35 )
        {
            alert("Il y a au moin une case non validé, veuliiez revérifier")
            valided = false
            return false
        }
      });
    if(valided)
    {
        $('form').submit()
        return true
    }
}
$( document ).ready(function() {
    refreshWordCount()
});

function loadingScreen() {
    var rand = blague[Math.floor(Math.random() * blague.length)];
    document.getElementById("overlay").style.visibility = "visible";
    document.getElementById("overlay").style.opacity = "1";
    document.getElementById("text").innerHTML = rand;
}

