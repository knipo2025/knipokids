(function(){
'use strict';
// ---------- 0. CORRECTIFS ----------
// Bug 1 : titre quiz resté orange après le Défi du jour
try{
  var _startQuiz=window.startQuiz;
  window.startQuiz=function(s){var el=document.getElementById('qht');if(el)el.style.color='';return _startQuiz(s);};
}catch(e){}
// Bug 2 : nettoyage des vieilles clés knipo_quiz_*
try{
  var todayKey='knipo_quiz_'+getDailyKey();
  Object.keys(localStorage).forEach(function(k){if(k.indexOf('knipo_quiz_')===0&&k!==todayKey)localStorage.removeItem(k);});
}catch(e){}

// ---------- 1. DONNÉES AVENTURE (pack Empires V2, FR/EN/IT) ----------
var ADV_UI={
  banner:{fr:"L'Aventure des Empires",en:"The Empire Adventure",it:"L'Avventura degli Imperi"},
  bannerSub:{fr:"4 trésors perdus à retrouver !",en:"4 lost treasures to find!",it:"4 tesori perduti da trovare!"},
  bannerDone:{fr:"Mission accomplie ! 🏆",en:"Mission complete! 🏆",it:"Missione compiuta! 🏆"},
  newTag:{fr:"NOUVEAU",en:"NEW",it:"NUOVO"},
  mapTitle:{fr:"🗺️ Carte des empires",en:"🗺️ Empire map",it:"🗺️ Mappa degli imperi"},
  mapSub:{fr:"Choisis ta destination, explorateur !",en:"Pick your destination, explorer!",it:"Scegli la tua destinazione, esploratore!"},
  locked:{fr:"Termine l'empire précédent !",en:"Finish the previous empire!",it:"Completa l'impero precedente!"},
  treasureN:{fr:"Trésor",en:"Treasure",it:"Tesoro"},
  found:{fr:"✅ Trésor trouvé",en:"✅ Treasure found",it:"✅ Tesoro trovato"},
  challenge:{fr:"🏆 Challenge final",en:"🏆 Final challenge",it:"🏆 Sfida finale"},
  perfect:{fr:"🌟 SANS-FAUTE ! +50 XP bonus !",en:"🌟 PERFECT RUN! +50 XP bonus!",it:"🌟 SENZA ERRORI! +50 XP bonus!"},
  again:{fr:"Déjà dans ta collection — bien joué !",en:"Already in your collection — well done!",it:"Già nella tua collezione — ben fatto!"},
  next:{fr:"Continuer →",en:"Continue →",it:"Continua →"},
  back:{fr:"← Accueil",en:"← Home",it:"← Inizio"},
  backMap:{fr:"← Carte",en:"← Map",it:"← Mappa"},
  themeLocked:{fr:"🔒 Termine « {e} » dans l'Aventure pour débloquer ce thème !",en:"🔒 Finish “{e}” in the Adventure to unlock this theme!",it:"🔒 Completa «{e}» nell'Avventura per sbloccare questo tema!"},
  orderInst:{fr:"Touche les étapes dans le bon ordre :",en:"Tap the steps in the right order:",it:"Tocca le tappe nell'ordine giusto:"},
  gapInst:{fr:"Touche le bon mot :",en:"Tap the right word:",it:"Tocca la parola giusta:"},
  tfInst:{fr:"Vrai ou faux express ⚡",en:"True or false express ⚡",it:"Vero o falso express ⚡"},
  tv:{fr:"Vrai",en:"True",it:"Vero"},tf:{fr:"Faux",en:"False",it:"Falso"},
  wrongOrder:{fr:"Pas le bon ordre… touche une étape pour la retirer !",en:"Not the right order… tap a step to remove it!",it:"Ordine sbagliato… tocca una tappa per rimuoverla!"}
};
var ADV={empires:[
{key:'mali',emoji:'👑',grad:'linear-gradient(135deg,#7a4200,#D4890A)',
 name:{fr:"Le Mali de Mansa Musa",en:"Mansa Musa's Mali",it:"Il Mali di Mansa Musa"},
 badge:{fr:"Trésor n°1 : L'or du roi",en:"Treasure #1: The king's gold",it:"Tesoro n°1: L'oro del re"},
 wowBig:{fr:"L'homme le plus riche de tous les temps ?",en:"The richest man of all time?",it:"L'uomo più ricco di tutti i tempi?"},
 wow:{fr:["En 1324, le roi Mansa Musa part en voyage vers La Mecque.","Avec lui : des dizaines de milliers de personnes et des chameaux chargés d'or pur.","Il distribue tellement d'or en Égypte que sa valeur baisse au Caire pendant des années !","Beaucoup d'historiens le considèrent comme l'un des hommes les plus riches de l'histoire."],
      en:["In 1324, King Mansa Musa sets off for Mecca.","With him: tens of thousands of people and camels loaded with pure gold.","He gives away so much gold in Egypt that its value drops in Cairo for years!","Many historians consider him one of the richest men in history."],
      it:["Nel 1324, il re Mansa Musa parte per La Mecca.","Con lui: decine di migliaia di persone e cammelli carichi d'oro puro.","Distribuisce così tanto oro in Egitto che il suo valore crolla al Cairo per anni!","Molti storici lo considerano uno degli uomini più ricchi della storia."]},
 cta:{fr:"Je pars chercher son trésor ! 🏜️",en:"I'm off to find his treasure! 🏜️",it:"Vado a cercare il suo tesoro! 🏜️"},
 questions:[
  {q:{fr:"Mansa Musa a donné tellement d'or pendant son voyage que…",en:"Mansa Musa gave away so much gold on his journey that…",it:"Mansa Musa ha regalato così tanto oro durante il viaggio che…"},
   h:{fr:"Pense à ce qui arrive quand il y a TROP de quelque chose.",en:"Think what happens when there's TOO MUCH of something.",it:"Pensa a cosa succede quando c'è TROPPO di qualcosa."},
   a:{fr:["l'or a perdu de sa valeur en Égypte","les chameaux ont refusé d'avancer","il a dû rentrer à pied","on lui a interdit de revenir"],
      en:["gold lost its value in Egypt","the camels refused to walk","he had to walk home","he was banned from returning"],
      it:["l'oro ha perso valore in Egitto","i cammelli si sono rifiutati di camminare","è dovuto tornare a piedi","gli è stato vietato di tornare"]},
   c:0,
   x:{fr:"Trop d'or = l'or vaut moins. Il a bouleversé l'économie d'un pays entier !",en:"Too much gold = gold worth less. He shook a whole country's economy!",it:"Troppo oro = oro che vale meno. Ha sconvolto l'economia di un intero paese!"}},
  {q:{fr:"Le voyage de Mansa Musa rassemblait des dizaines de milliers de personnes.",en:"Mansa Musa's journey gathered tens of thousands of people.",it:"Il viaggio di Mansa Musa riuniva decine di migliaia di persone."},
   h:{fr:"Imagine une ville entière qui se déplace dans le désert…",en:"Imagine a whole city moving through the desert…",it:"Immagina un'intera città che si sposta nel deserto…"},
   a:{fr:["Vrai","Faux"],en:["True","False"],it:["Vero","Falso"]},c:0,
   x:{fr:"Une caravane géante : soldats, serviteurs, savants… une ville en marche !",en:"A giant caravan: soldiers, servants, scholars… a city on the move!",it:"Una carovana gigante: soldati, servitori, studiosi… una città in marcia!"}},
  {q:{fr:"D'où venait l'immense richesse de l'Empire du Mali ?",en:"Where did the Mali Empire's huge wealth come from?",it:"Da dove veniva l'immensa ricchezza dell'Impero del Mali?"},
   h:{fr:"Ça brille et ça se trouve sous terre.",en:"It shines and is found underground.",it:"Brilla e si trova sottoterra."},
   a:{fr:["Des mines d'or de son territoire","D'un trésor de pirates","De la vente de sable du désert","D'un cadeau des rois d'Europe"],
      en:["Gold mines in its territory","A pirate treasure","Selling desert sand","A gift from European kings"],
      it:["Miniere d'oro del suo territorio","Un tesoro dei pirati","La vendita di sabbia del deserto","Un regalo dei re d'Europa"]},
   c:0,
   x:{fr:"Le Mali contrôlait certaines des plus grandes sources d'or du monde de l'époque !",en:"Mali controlled some of the biggest gold sources of its time!",it:"Il Mali controllava alcune delle più grandi fonti d'oro dell'epoca!"}}],
 challenge:{type:'seq',
  title:{fr:"Remets le voyage dans l'ordre",en:"Put the journey in order",it:"Rimetti il viaggio in ordine"},
  tokens:{fr:["Départ du Mali","Traversée du désert","Or distribué au Caire","Le monde en parle"],
          en:["Leaving Mali","Crossing the desert","Gold given in Cairo","The world talks about it"],
          it:["Partenza dal Mali","Traversata del deserto","Oro distribuito al Cairo","Il mondo ne parla"]}},
 card:{id:'adv_mali',e:'🐪',adv:true,
  n:{fr:"La Caravane d'Or",en:"The Golden Caravan",it:"La Carovana d'Oro"},
  x:{fr:"Mansa Musa a distribué tant d'or que les prix ont chuté au Caire !",en:"Mansa Musa gave away so much gold that prices crashed in Cairo!",it:"Mansa Musa regalò così tanto oro che i prezzi crollarono al Cairo!"}}},

{key:'timbuktu',emoji:'📚',grad:'linear-gradient(135deg,#3D3099,#6B63D4)',
 name:{fr:"Tombouctou, ville du savoir",en:"Timbuktu, city of knowledge",it:"Timbuctù, città del sapere"},
 badge:{fr:"Trésor n°2 : Le manuscrit perdu",en:"Treasure #2: The lost manuscript",it:"Tesoro n°2: Il manoscritto perduto"},
 wowBig:{fr:"Une ville-bibliothèque en plein désert",en:"A library-city in the desert",it:"Una città-biblioteca nel deserto"},
 wow:{fr:["Au bord du Sahara, une ville attirait des étudiants venus de très loin.","On y trouvait des dizaines de milliers de manuscrits : sciences, astronomie, médecine, poésie…","Les livres y comptaient parmi les marchandises les plus précieuses.","Beaucoup de ces manuscrits existent encore aujourd'hui !"],
      en:["On the edge of the Sahara, a city drew students from far away.","It held tens of thousands of manuscripts: science, astronomy, medicine, poetry…","Books were among its most precious goods.","Many of these manuscripts still exist today!"],
      it:["Ai margini del Sahara, una città attirava studenti da molto lontano.","Vi si trovavano decine di migliaia di manoscritti: scienze, astronomia, medicina, poesia…","I libri erano tra le merci più preziose.","Molti di questi manoscritti esistono ancora oggi!"]},
 cta:{fr:"Je pars chercher le manuscrit ! 📜",en:"I'm off to find the manuscript! 📜",it:"Vado a cercare il manoscritto! 📜"},
 questions:[
  {q:{fr:"Qu'est-ce qui rendait Tombouctou célèbre dans le monde ?",en:"What made Timbuktu famous around the world?",it:"Cosa rendeva Timbuctù famosa nel mondo?"},
   h:{fr:"Ça se lit, ça s'étudie, ça se transmet.",en:"You read it, study it, pass it on.",it:"Si legge, si studia, si trasmette."},
   a:{fr:["Ses manuscrits et ses écoles","Ses plages de sable fin","Ses courses de chameaux","Son équipe de football"],
      en:["Its manuscripts and schools","Its sandy beaches","Its camel races","Its football team"],
      it:["I suoi manoscritti e le sue scuole","Le sue spiagge di sabbia","Le corse di cammelli","La sua squadra di calcio"]},
   c:0,
   x:{fr:"Une ville où le savoir valait de l'or… littéralement.",en:"A city where knowledge was worth gold… literally.",it:"Una città dove il sapere valeva oro… letteralmente."}},
  {q:{fr:"Les manuscrits de Tombouctou parlaient seulement de religion.",en:"Timbuktu's manuscripts were only about religion.",it:"I manoscritti di Timbuctù parlavano solo di religione."},
   h:{fr:"Astronomie, maths, médecine…",en:"Astronomy, maths, medicine…",it:"Astronomia, matematica, medicina…"},
   a:{fr:["Vrai","Faux"],en:["True","False"],it:["Vero","Falso"]},c:1,
   x:{fr:"On y étudiait aussi les étoiles, les maths, la médecine, le droit, la poésie…",en:"They also studied stars, maths, medicine, law, poetry…",it:"Si studiavano anche le stelle, la matematica, la medicina, il diritto, la poesia…"}},
  {q:{fr:"Dans quelle célèbre université-mosquée étudiait-on à Tombouctou ?",en:"In which famous mosque-university did people study in Timbuktu?",it:"In quale famosa università-moschea si studiava a Timbuctù?"},
   h:{fr:"Son nom commence par San…",en:"Its name starts with San…",it:"Il suo nome inizia con San…"},
   a:{fr:["Sankoré","Sorbonne","Sakura","Santiago"],en:["Sankore","Sorbonne","Sakura","Santiago"],it:["Sankoré","Sorbona","Sakura","Santiago"]},c:0,
   x:{fr:"Sankoré, l'un des grands centres d'étude de l'époque !",en:"Sankore, one of the great study centers of its time!",it:"Sankoré, uno dei grandi centri di studio dell'epoca!"}}],
 challenge:{type:'gap',
  title:{fr:"Complète le parchemin",en:"Complete the scroll",it:"Completa la pergamena"},
  s:{fr:["À Tombouctou, les","___","valaient autant que les marchandises les plus précieuses."],
     en:["In Timbuktu,","___","were worth as much as the most precious goods."],
     it:["A Timbuctù, i","___","valevano quanto le merci più preziose."]},
  ans:{fr:"livres",en:"books",it:"libri"},
  bank:{fr:["épées","livres","tapis","bijoux"],en:["swords","books","carpets","jewels"],it:["spade","libri","tappeti","gioielli"]}},
 card:{id:'adv_timbuktu',e:'📜',adv:true,
  n:{fr:"Le Savant de Sankoré",en:"The Sankore Scholar",it:"Lo Studioso di Sankoré"},
  x:{fr:"À Tombouctou, les livres valaient de l'or !",en:"In Timbuktu, books were worth gold!",it:"A Timbuctù, i libri valevano oro!"}}},

{key:'ghana',emoji:'🪙',grad:'linear-gradient(135deg,#1D7A55,#2DAF7E)',
 name:{fr:"L'Empire du Ghana",en:"The Ghana Empire",it:"L'Impero del Ghana"},
 badge:{fr:"Trésor n°3 : Le sel plus cher que l'or",en:"Treasure #3: Salt dearer than gold",it:"Tesoro n°3: Il sale più caro dell'oro"},
 wowBig:{fr:"Le sel qui s'échangeait contre de l'or",en:"Salt traded for gold",it:"Il sale scambiato con l'oro"},
 wow:{fr:["Dans l'Empire du Ghana (le Wagadou), deux trésors traversaient le désert : l'or… et le sel.","Le sel était si précieux qu'on raconte qu'il pouvait s'échanger contre de l'or !","Pourquoi ? Sans frigo, le sel servait à conserver la nourriture. Vital !","Le roi contrôlait ce commerce géant et sa capitale impressionnait les voyageurs."],
      en:["In the Ghana Empire (Wagadou), two treasures crossed the desert: gold… and salt.","Salt was so precious it's said it could be traded for gold!","Why? With no fridges, salt preserved food. Vital!","The king controlled this giant trade and his capital amazed travelers."],
      it:["Nell'Impero del Ghana (Wagadou), due tesori attraversavano il deserto: l'oro… e il sale.","Il sale era così prezioso che si dice potesse essere scambiato con l'oro!","Perché? Senza frigo, il sale conservava il cibo. Vitale!","Il re controllava questo commercio gigante e la sua capitale stupiva i viaggiatori."]},
 cta:{fr:"Je pars sur la route de l'or ! 🐫",en:"I'm off on the gold road! 🐫",it:"Parto sulla via dell'oro! 🐫"},
 questions:[
  {q:{fr:"Pourquoi le sel était-il si précieux à l'époque ?",en:"Why was salt so precious back then?",it:"Perché il sale era così prezioso all'epoca?"},
   h:{fr:"Pas de frigo il y a 1000 ans…",en:"No fridges 1,000 years ago…",it:"Niente frigo 1000 anni fa…"},
   a:{fr:["Il servait à conserver les aliments","Il rendait invisible","Il servait à construire les maisons","Les rois le mangeaient au petit-déjeuner"],
      en:["It preserved food","It made you invisible","It was used to build houses","Kings ate it for breakfast"],
      it:["Serviva a conservare gli alimenti","Rendeva invisibili","Serviva a costruire le case","I re lo mangiavano a colazione"]},
   c:0,
   x:{fr:"Sans sel, pas de conservation. C'était une question de survie !",en:"No salt, no preserved food. It was a matter of survival!",it:"Senza sale, niente conservazione. Era questione di sopravvivenza!"}},
  {q:{fr:"L'Empire du Ghana se trouvait au même endroit que le pays actuel appelé Ghana.",en:"The Ghana Empire was located where the modern country of Ghana is.",it:"L'Impero del Ghana si trovava dove si trova il paese attuale chiamato Ghana."},
   h:{fr:"Piège ! Regarde vers le Sénégal, la Mauritanie et le Mali actuels.",en:"Trick! Look towards modern Senegal, Mauritania and Mali.",it:"Trabocchetto! Guarda verso Senegal, Mauritania e Mali attuali."},
   a:{fr:["Vrai","Faux"],en:["True","False"],it:["Vero","Falso"]},c:1,
   x:{fr:"Le vieil empire était plus au nord-ouest. Le pays moderne a repris ce nom glorieux !",en:"The old empire was further northwest. The modern country adopted this glorious name!",it:"Il vecchio impero era più a nord-ovest. Il paese moderno ha ripreso questo nome glorioso!"}},
  {q:{fr:"Comment les marchandises traversaient-elles le Sahara ?",en:"How did goods cross the Sahara?",it:"Come attraversavano il Sahara le merci?"},
   h:{fr:"Un animal capable de tenir des jours sans boire.",en:"An animal that can go days without drinking.",it:"Un animale che resiste giorni senza bere."},
   a:{fr:["En caravanes de chameaux","En bateau à voile","En montgolfière","À dos d'éléphant"],
      en:["In camel caravans","By sailboat","By hot-air balloon","On elephants"],
      it:["In carovane di cammelli","In barca a vela","In mongolfiera","A dorso di elefante"]},
   c:0,
   x:{fr:"Des caravanes de centaines de chameaux reliaient les deux côtés du désert !",en:"Caravans of hundreds of camels linked both sides of the desert!",it:"Carovane di centinaia di cammelli collegavano i due lati del deserto!"}}],
 challenge:{type:'gap',
  title:{fr:"Complète le secret du Wagadou",en:"Complete Wagadou's secret",it:"Completa il segreto del Wagadou"},
  s:{fr:["Le","___","était si précieux qu'il pouvait s'échanger contre de l'or."],
     en:["","___","was so precious it could be traded for gold."],
     it:["Il","___","era così prezioso che poteva essere scambiato con l'oro."]},
  ans:{fr:"sel",en:"Salt",it:"sale"},
  bank:{fr:["sable","sel","fer","poivre"],en:["Sand","Salt","Iron","Pepper"],it:["sabbia","sale","ferro","pepe"]}},
 card:{id:'adv_ghana',e:'🪙',adv:true,
  n:{fr:"Le Roi du Wagadou",en:"The King of Wagadou",it:"Il Re del Wagadou"},
  x:{fr:"Il contrôlait l'or ET le sel du désert !",en:"He controlled the desert's gold AND salt!",it:"Controllava l'oro E il sale del deserto!"}}},

{key:'songhai',emoji:'🏛️',grad:'linear-gradient(135deg,#0a3d6b,#1565a0)',
 name:{fr:"Songhaï, l'empire géant",en:"Songhai, the giant empire",it:"Songhai, l'impero gigante"},
 badge:{fr:"Trésor n°4 : La flotte du fleuve",en:"Treasure #4: The river fleet",it:"Tesoro n°4: La flotta del fiume"},
 wowBig:{fr:"Une armée sur terre ET sur l'eau",en:"An army on land AND on water",it:"Un esercito sulla terra E sull'acqua"},
 wow:{fr:["Le Songhaï est devenu l'un des plus vastes empires de l'Afrique de l'Ouest.","Son secret ? Des cavaliers rapides sur terre… et une flotte de grands canoës de guerre sur le fleuve Niger !","Le roi Sonni Ali utilisait le fleuve comme une autoroute militaire.","Plus tard, Askia Mohammed organisa l'empire avec des provinces et des gouverneurs."],
      en:["Songhai became one of West Africa's largest empires.","Its secret? Fast horsemen on land… and a fleet of great war canoes on the Niger River!","King Sonni Ali used the river as a military highway.","Later, Askia Mohammed organized the empire with provinces and governors."],
      it:["Il Songhai divenne uno dei più vasti imperi dell'Africa occidentale.","Il suo segreto? Cavalieri veloci sulla terra… e una flotta di grandi canoe da guerra sul fiume Niger!","Il re Sonni Ali usava il fiume come un'autostrada militare.","Più tardi, Askia Mohammed organizzò l'impero con province e governatori."]},
 cta:{fr:"Je rejoins la flotte ! 🛶",en:"I'm joining the fleet! 🛶",it:"Mi unisco alla flotta! 🛶"},
 questions:[
  {q:{fr:"Quelle était l'arme secrète de l'empire Songhaï ?",en:"What was the Songhai empire's secret weapon?",it:"Qual era l'arma segreta dell'impero Songhai?"},
   h:{fr:"Ça flotte et ça va vite.",en:"It floats and goes fast.",it:"Galleggia e va veloce."},
   a:{fr:["Une flotte de canoës de guerre sur le Niger","Des éléphants blindés","Des tours qui roulent","Des cerfs-volants espions"],
      en:["A fleet of war canoes on the Niger","Armored elephants","Rolling towers","Spy kites"],
      it:["Una flotta di canoe da guerra sul Niger","Elefanti corazzati","Torri che rotolano","Aquiloni spia"]},
   c:0,
   x:{fr:"Le fleuve Niger était leur autoroute militaire. Personne n'allait aussi vite !",en:"The Niger River was their military highway. No one moved faster!",it:"Il fiume Niger era la loro autostrada militare. Nessuno era così veloce!"}},
  {q:{fr:"L'empire Songhaï était minuscule.",en:"The Songhai empire was tiny.",it:"L'impero Songhai era minuscolo."},
   h:{fr:"Regarde une carte de l'Afrique de l'Ouest au 16e siècle…",en:"Look at a 16th-century map of West Africa…",it:"Guarda una mappa dell'Africa occidentale del 16° secolo…"},
   a:{fr:["Vrai","Faux"],en:["True","False"],it:["Vero","Falso"]},c:1,
   x:{fr:"Immense ! Il s'étendait sur une grande partie de l'Afrique de l'Ouest.",en:"Huge! It covered a large part of West Africa.",it:"Immenso! Copriva gran parte dell'Africa occidentale."}},
  {q:{fr:"Comment Askia Mohammed gérait-il cet empire géant ?",en:"How did Askia Mohammed run this giant empire?",it:"Come gestiva Askia Mohammed questo impero gigante?"},
   h:{fr:"Comme un pays moderne, découpé en régions.",en:"Like a modern country, split into regions.",it:"Come un paese moderno, diviso in regioni."},
   a:{fr:["Avec des provinces et des gouverneurs","En laissant chacun faire ce qu'il veut","En interdisant les voyages","En demandant à son perroquet"],
      en:["With provinces and governors","Letting everyone do as they pleased","By banning travel","By asking his parrot"],
      it:["Con province e governatori","Lasciando fare a ciascuno ciò che vuole","Vietando i viaggi","Chiedendo al suo pappagallo"]},
   c:0,
   x:{fr:"Provinces, gouverneurs, administration : impressionnant pour l'époque !",en:"Provinces, governors, administration: impressive for its time!",it:"Province, governatori, amministrazione: impressionante per l'epoca!"}}],
 challenge:{type:'tf3',
  title:{fr:"Vrai ou faux express ⚡",en:"True or false express ⚡",it:"Vero o falso express ⚡"},
  items:[
   {t:{fr:"Le Songhaï avait des canoës de guerre sur le Niger.",en:"Songhai had war canoes on the Niger.",it:"Il Songhai aveva canoe da guerra sul Niger."},ans:true},
   {t:{fr:"L'empire Songhaï était l'un des plus vastes d'Afrique de l'Ouest.",en:"The Songhai empire was one of West Africa's largest.",it:"L'impero Songhai era uno dei più vasti dell'Africa occidentale."},ans:true},
   {t:{fr:"Askia Mohammed gouvernait sans aucune organisation.",en:"Askia Mohammed ruled with no organization at all.",it:"Askia Mohammed governava senza alcuna organizzazione."},ans:false}]},
 card:{id:'adv_songhai',e:'🛶',adv:true,
  n:{fr:"La Flotte d'Askia",en:"Askia's Fleet",it:"La Flotta di Askia"},
  x:{fr:"Des canoës de guerre sur le fleuve Niger !",en:"War canoes on the Niger River!",it:"Canoe da guerra sul fiume Niger!"}}}
]};
// Thèmes verrouillés tant que l'empire lié n'est pas terminé
var THEME_REQ={maths:'mali',proverbes:'timbuktu',animaux:'ghana',geo:'songhai'};

// ---------- 2. ÉTAT ----------
function advState(){try{return JSON.parse(localStorage.getItem('knipo_adv')||'{"done":[],"perfect":[]}');}catch(e){return {done:[],perfect:[]};}}
function advSave(s){try{localStorage.setItem('knipo_adv',JSON.stringify(s));}catch(e){}}
function advL(o){return (o&&(o[lang]||o.fr))||'';}
var advE=0,advQi=0,advErr=0,advSeq=[],advTfI=0,advAnswered=false;

// ---------- 3. CSS ----------
var advCss=document.createElement('style');
advCss.textContent=[
'.adv-banner{width:100%;display:flex;align-items:center;gap:12px;background:linear-gradient(135deg,#4a1d6e,#7c3aad);border:1.5px solid rgba(255,255,255,.25);border-radius:16px;padding:12px 14px;margin-bottom:10px;cursor:pointer;text-align:left;box-shadow:0 5px 18px rgba(74,29,110,.45);transition:transform .15s}',
'.adv-banner:hover{transform:translateY(-2px)}',
'.adv-banner .ab-ic{font-size:32px;flex-shrink:0;filter:drop-shadow(0 2px 4px rgba(0,0,0,.3))}',
'.adv-banner .ab-mid{flex:1;min-width:0}',
'.adv-banner .ab-ti{font-family:"Baloo 2",cursive;font-size:15px;font-weight:800;color:#FFD54A;display:flex;align-items:center;gap:6px}',
'.adv-banner .ab-new{background:#E91E8C;color:#fff;font-size:9px;font-weight:800;letter-spacing:1px;border-radius:10px;padding:2px 7px}',
'.adv-banner .ab-sub{font-size:11px;color:rgba(255,255,255,.75);font-weight:700;margin-top:2px}',
'.adv-banner .ab-bar{display:block;background:rgba(255,255,255,.16);border-radius:20px;height:7px;margin-top:6px;overflow:hidden}',
'.adv-banner .ab-fill{display:block;background:linear-gradient(90deg,#FFD54A,#EF9F27);height:7px;border-radius:20px;transition:width .5s}',
'.adv-banner .ab-count{font-family:"Baloo 2",cursive;font-size:13px;font-weight:800;color:#fff;flex-shrink:0}',
'.adv-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:14px}',
'.adv-emp{border-radius:20px;padding:16px 10px;text-align:center;cursor:pointer;border:2px solid rgba(255,255,255,.2);background:rgba(255,255,255,.1);position:relative;transition:transform .15s,border-color .15s;min-height:120px;display:flex;flex-direction:column;align-items:center;justify-content:center}',
'.adv-emp:not(.locked):hover{transform:scale(1.04);border-color:#FFD54A}',
'.adv-emp .ae-em{font-size:38px;line-height:1}',
'.adv-emp .ae-nm{font-family:"Baloo 2",cursive;font-weight:800;font-size:13px;color:#fff;margin-top:7px;line-height:1.25}',
'.adv-emp .ae-tag{font-size:10.5px;margin-top:5px;color:#FFE082;font-weight:700}',
'.adv-emp.locked{opacity:.45;cursor:not-allowed;filter:grayscale(.6)}',
'.adv-emp.done{border-color:#1D9E75}',
'.adv-emp .ae-check{position:absolute;top:-8px;right:-8px;background:#1D9E75;width:26px;height:26px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:14px}',
'.adv-wowbig{font-family:"Baloo 2",cursive;font-size:22px;font-weight:800;line-height:1.25;margin-bottom:14px;color:#FFD54A}',
'.adv-wowline{background:rgba(255,255,255,.1);border-left:4px solid #FFD54A;border-radius:0 14px 14px 0;padding:11px 14px;margin-bottom:10px;font-size:14px;line-height:1.5;color:#fff;font-weight:600;opacity:0;animation:advLineIn .5s forwards}',
'.adv-wowline:nth-child(1){animation-delay:.05s}.adv-wowline:nth-child(2){animation-delay:.5s}.adv-wowline:nth-child(3){animation-delay:.95s}.adv-wowline:nth-child(4){animation-delay:1.4s}',
'@keyframes advLineIn{from{opacity:0;transform:translateX(-14px)}to{opacity:1;transform:none}}',
'.adv-cta{display:block;width:100%;border:none;cursor:pointer;background:linear-gradient(180deg,#EF9F27,#d97b06);color:#fff;font-size:17px;font-weight:800;font-family:"Baloo 2",cursive;padding:15px;border-radius:16px;box-shadow:0 5px 0 #9a5a12;transition:transform .1s,box-shadow .1s;margin-top:6px}',
'.adv-cta:active{transform:translateY(4px);box-shadow:0 1px 0 #9a5a12}',
'.adv-qcount{font-size:11px;font-weight:800;letter-spacing:1px;text-transform:uppercase;color:#FFE082;margin-bottom:8px}',
'.adv-slots{display:flex;flex-wrap:wrap;gap:8px;min-height:52px;background:rgba(0,0,0,.25);border-radius:14px;padding:9px;margin-bottom:14px}',
'.adv-slot{background:#FFD54A;color:#451a03;font-weight:800;font-size:13px;border-radius:10px;padding:9px 11px;cursor:pointer;border:none;font-family:"Nunito",sans-serif}',
'.adv-token{background:rgba(255,255,255,.12);border:2px solid rgba(255,255,255,.3);color:#fff;font-weight:800;font-size:13px;font-family:"Nunito",sans-serif;cursor:pointer;border-radius:12px;padding:11px 13px;margin:0 8px 10px 0;transition:all .15s}',
'.adv-token:hover{border-color:#FFD54A}',
'.adv-token.used{opacity:.25;pointer-events:none}'
].join('\n');
document.head.appendChild(advCss);

// ---------- 4. HTML (pages + bannière) ----------
document.body.insertAdjacentHTML('beforeend',
'<div id="page-adventure" class="hidden">'+
'<button class="back-btn" id="adv-bk1" onclick="goHome()">← Accueil</button>'+
'<div class="coll-head"><div class="ch-ti" id="adv-map-ti"></div><div class="ch-sub" id="adv-map-sub"></div></div>'+
'<div class="adv-grid" id="adv-map-grid"></div>'+
'</div>'+
'<div id="page-adv-play" class="hidden">'+
'<button class="back-btn" id="adv-bk2" onclick="advOpenMap()">← Carte</button>'+
'<div id="adv-play-body"></div>'+
'</div>');
(function(){
  var dc=document.getElementById('daily-card');
  if(dc){
    var b=document.createElement('button');
    b.className='adv-banner';b.id='adv-banner';
    b.onclick=function(){advOpenMap();};
    b.innerHTML='<div class="ab-ic">🗺️</div><div class="ab-mid"><div class="ab-ti"><span id="adv-b-ti"></span><span class="ab-new" id="adv-b-new"></span></div><div class="ab-sub" id="adv-b-sub"></div><span class="ab-bar"><span class="ab-fill" id="adv-b-fill" style="width:0%"></span></span></div><div class="ab-count" id="adv-b-count">0/4</div>';
    dc.parentNode.insertBefore(b,dc);
  }
})();

// ---------- 5. WRAPPERS ----------
var _showPage=window.showPage;
window.showPage=function(id){
  ['page-adventure','page-adv-play'].forEach(function(p){var el=document.getElementById(p);if(el)el.classList.add('hidden');});
  _showPage(id);
};
var _applyLang=window.applyLang;
window.applyLang=function(){_applyLang();advRefreshUI();};
var _awardTreasure=window.awardTreasure;
window.awardTreasure=function(){
  var owned=ownedTreasures();
  var locked=TREASURES.filter(function(t){return !t.adv&&!owned.has(t.id);});
  if(!locked.length)return null;
  var t=locked[Math.floor(Math.random()*locked.length)];
  owned.add(t.id);saveTreasures(owned);renderTreasureProgress();
  return t;
};
var _showIntro=window.showIntro;
window.showIntro=function(subj){
  if(THEME_REQ[subj]&&!advThemeUnlocked(subj)){
    var emp=advEmpireByKey(THEME_REQ[subj]);
    showToast(advL(ADV_UI.themeLocked).replace('{e}',advL(emp.name)));
    if(typeof playSound==='function')playSound('wrong');
    return;
  }
  _showIntro(subj);
};
// Cartes aventure ajoutées à la collection existante
ADV.empires.forEach(function(e){
  if(!TREASURES.some(function(t){return t.id===e.card.id;}))TREASURES.push(e.card);
});

// ---------- 6. LOGIQUE ----------
function advEmpireByKey(k){for(var i=0;i<ADV.empires.length;i++)if(ADV.empires[i].key===k)return ADV.empires[i];return ADV.empires[0];}
function advThemeUnlocked(subj){
  if((masteryData[subj]||0)>0)return true; // joueurs existants : accès conservé
  var req=THEME_REQ[subj];if(!req)return true;
  return advState().done.indexOf(req)>=0;
}
function advEmpireUnlocked(i){
  if(i===0)return true;
  return advState().done.indexOf(ADV.empires[i-1].key)>=0;
}
window.advOpenMap=function(){
  advRenderMap();
  window.showPage('__adv__');
  var el=document.getElementById('page-adventure');if(el)el.classList.remove('hidden');
  window.scrollTo(0,0);
};
function advOpenPlay(){
  window.showPage('__adv__');
  var el=document.getElementById('page-adv-play');if(el)el.classList.remove('hidden');
  window.scrollTo(0,0);
}
function advRenderMap(){
  var st=advState();
  document.getElementById('adv-map-ti').textContent=advL(ADV_UI.mapTitle);
  document.getElementById('adv-map-sub').textContent=st.done.length>=4?advL(ADV_UI.bannerDone):advL(ADV_UI.mapSub);
  document.getElementById('adv-bk1').textContent=advL(ADV_UI.back);
  var g=document.getElementById('adv-map-grid');g.innerHTML='';
  ADV.empires.forEach(function(e,i){
    var unlocked=advEmpireUnlocked(i),done=st.done.indexOf(e.key)>=0;
    var d=document.createElement('div');
    d.className='adv-emp'+(unlocked?'':' locked')+(done?' done':'');
    d.innerHTML=(done?'<div class="ae-check">✓</div>':'')+
      '<div class="ae-em">'+(unlocked?e.emoji:'🔒')+'</div>'+
      '<div class="ae-nm">'+advL(e.name)+'</div>'+
      '<div class="ae-tag">'+(done?advL(ADV_UI.found):(unlocked?advL(e.badge):advL(ADV_UI.locked)))+'</div>';
    if(unlocked)d.onclick=function(){advStart(i);};
    g.appendChild(d);
  });
}
window.advStart=function(i){
  advE=i;advQi=0;advErr=0;advTfI=0;
  advRenderWow();advOpenPlay();
};
function advRenderWow(){
  var e=ADV.empires[advE];
  document.getElementById('adv-bk2').textContent=advL(ADV_UI.backMap);
  var lines=e.wow[lang]||e.wow.fr;
  var h='<div class="adv-qcount">'+e.emoji+' '+advL(e.name)+'</div>';
  h+='<div class="adv-wowbig">'+advL(e.wowBig)+'</div><div>';
  lines.forEach(function(l){h+='<div class="adv-wowline">'+l+'</div>';});
  h+='</div><button class="adv-cta" onclick="advQ()">'+advL(e.cta)+'</button>';
  document.getElementById('adv-play-body').innerHTML=h;
  if(typeof speak==='function')speak(advL(e.wowBig)+'. '+lines.join(' '));
}
window.advQ=function(){
  var e=ADV.empires[advE];
  if(advQi>=e.questions.length){advChallenge();return;}
  advAnswered=false;
  var q=e.questions[advQi];
  var opts=q.a[lang]||q.a.fr;
  var LETTERS=['A','B','C','D'];
  var h='<div class="adv-qcount">'+e.emoji+' '+advL(e.name)+' · '+(advQi+1)+'/'+e.questions.length+'</div>';
  h+='<div class="qcard"><div class="qtx">'+advL(q.q)+'</div><div class="qhint">💡 '+advL(q.h)+'</div></div>';
  h+='<div class="agrid" id="adv-agrid">';
  opts.forEach(function(o,i){h+='<button class="abtn" data-letter="'+LETTERS[i]+'" onclick="advPick('+i+')">'+o+'</button>';});
  h+='</div><div class="fb" id="adv-fb"><span class="fb-ic" id="adv-fb-ic"></span><div class="fb-body"><strong id="adv-fb-ti"></strong><span id="adv-fb-ms"></span></div></div>';
  h+='<button class="nxtbtn" id="adv-next" onclick="advNext()">'+advL(ADV_UI.next)+'</button>';
  document.getElementById('adv-play-body').innerHTML=h;
  if(typeof speak==='function')speak(advL(q.q));
};
window.advNext=function(){advQi++;advQ();};
window.advPick=function(ch){
  if(advAnswered)return;advAnswered=true;
  var e=ADV.empires[advE],q=e.questions[advQi];
  var btns=document.getElementById('adv-agrid').querySelectorAll('.abtn');
  btns.forEach(function(b,i){b.disabled=true;if(i===q.c)b.classList.add('ok');if(i===ch&&ch!==q.c)b.classList.add('no');});
  var ok=ch===q.c;
  if(ok){
    xpTotal+=10;updateXP();
    if(typeof playSound==='function')playSound('correct');
    if(typeof confettiBurst==='function')confettiBurst(true);
    if(typeof floatXP==='function')floatXP('+10 XP');
  }else{
    advErr++;
    if(typeof playSound==='function')playSound('wrong');
  }
  document.getElementById('adv-fb').className='fb show '+(ok?'ok':'no');
  document.getElementById('adv-fb-ic').textContent=ok?'🌟':'💪';
  document.getElementById('adv-fb-ti').textContent=(typeof randFeedback==='function')?randFeedback(ok):(ok?'Bravo !':'Presque !');
  document.getElementById('adv-fb-ms').textContent=advL(q.x);
  document.getElementById('adv-next').className='nxtbtn show';
};
// ----- Challenges -----
function advChallenge(){
  var e=ADV.empires[advE],c=e.challenge;
  if(c.type==='seq')advChSeq(e,c);
  else if(c.type==='gap')advChGap(e,c);
  else advChTf(e,c);
}
function advChSeq(e,c){
  advSeq=[];
  var tokens=(c.tokens[lang]||c.tokens.fr).slice();
  var shuffled=tokens.slice().sort(function(){return Math.random()-.5;});
  var h='<div class="adv-qcount">'+advL(ADV_UI.challenge)+' · '+e.emoji+' '+advL(e.name)+'</div>';
  h+='<div class="qcard"><div class="qtx">'+advL(c.title)+'</div><div class="qhint">'+advL(ADV_UI.orderInst)+'</div></div>';
  h+='<div class="adv-slots" id="adv-slots"></div><div id="adv-bank">';
  shuffled.forEach(function(t){h+='<button class="adv-token" onclick="advTok(this)">'+t+'</button>';});
  h+='</div><div class="fb" id="adv-fb"><span class="fb-ic" id="adv-fb-ic"></span><div class="fb-body"><strong id="adv-fb-ti"></strong><span id="adv-fb-ms"></span></div></div>';
  document.getElementById('adv-play-body').innerHTML=h;
}
window.advTok=function(el){
  var e=ADV.empires[advE],c=e.challenge;
  var solution=c.tokens[lang]||c.tokens.fr;
  var t=el.textContent;
  el.classList.add('used');advSeq.push(t);
  if(typeof playTone==='function')playTone(600+advSeq.length*120,.1,'square');
  var slot=document.createElement('button');
  slot.className='adv-slot';slot.textContent=advSeq.length+'. '+t;
  slot.onclick=function(){
    var idx=advSeq.indexOf(t);if(idx>-1)advSeq.splice(idx,1);
    slot.remove();el.classList.remove('used');
    var slots=document.querySelectorAll('.adv-slot');
    slots.forEach(function(s,i){s.textContent=(i+1)+'. '+s.textContent.replace(/^\d+\. /,'');});
    document.getElementById('adv-fb').className='fb';
  };
  document.getElementById('adv-slots').appendChild(slot);
  if(advSeq.length===solution.length){
    var ok=advSeq.every(function(v,i){return v===solution[i];});
    var fb=document.getElementById('adv-fb');
    if(ok){advChWin();}
    else{
      advErr++;
      if(typeof playSound==='function')playSound('wrong');
      fb.className='fb show no';
      document.getElementById('adv-fb-ic').textContent='💪';
      document.getElementById('adv-fb-ti').textContent='';
      document.getElementById('adv-fb-ms').textContent=advL(ADV_UI.wrongOrder);
    }
  }
};
function advChGap(e,c){
  var sent=(c.s[lang]||c.s.fr),bank=(c.bank[lang]||c.bank.fr).slice().sort(function(){return Math.random()-.5;});
  var h='<div class="adv-qcount">'+advL(ADV_UI.challenge)+' · '+e.emoji+' '+advL(e.name)+'</div>';
  h+='<div class="qcard"><div class="qtx">'+sent.join(' ').replace('___','<span style="border-bottom:3px dashed #EF9F27;padding:0 14px">?</span>')+'</div><div class="qhint">'+advL(ADV_UI.gapInst)+'</div></div>';
  h+='<div class="agrid" id="adv-agrid">';
  bank.forEach(function(w,i){h+='<button class="abtn" onclick="advGapPick(this)">'+w+'</button>';});
  h+='</div><div class="fb" id="adv-fb"><span class="fb-ic" id="adv-fb-ic"></span><div class="fb-body"><strong id="adv-fb-ti"></strong><span id="adv-fb-ms"></span></div></div>';
  document.getElementById('adv-play-body').innerHTML=h;
}
window.advGapPick=function(el){
  var e=ADV.empires[advE],c=e.challenge;
  var ans=advL(c.ans);
  if(el.textContent===ans){
    el.classList.add('ok');
    document.getElementById('adv-agrid').querySelectorAll('.abtn').forEach(function(b){b.disabled=true;});
    advChWin();
  }else{
    el.classList.add('no');el.disabled=true;advErr++;
    if(typeof playSound==='function')playSound('wrong');
  }
};
function advChTf(e,c){
  if(advTfI>=c.items.length){advChWin();return;}
  var it=c.items[advTfI];
  var h='<div class="adv-qcount">'+advL(ADV_UI.challenge)+' · '+(advTfI+1)+'/'+c.items.length+'</div>';
  h+='<div class="qcard"><div class="qtx">'+advL(it.t)+'</div><div class="qhint">'+advL(ADV_UI.tfInst)+'</div></div>';
  h+='<div class="agrid" id="adv-agrid">';
  h+='<button class="abtn" data-letter="A" onclick="advTfPick(true)">'+advL(ADV_UI.tv)+'</button>';
  h+='<button class="abtn" data-letter="B" onclick="advTfPick(false)">'+advL(ADV_UI.tf)+'</button>';
  h+='</div>';
  document.getElementById('adv-play-body').innerHTML=h;
}
window.advTfPick=function(v){
  var e=ADV.empires[advE],c=e.challenge,it=c.items[advTfI];
  var ok=v===it.ans;
  if(ok){if(typeof playSound==='function')playSound('correct');if(typeof floatXP==='function')floatXP('+5 XP');xpTotal+=5;updateXP();}
  else{advErr++;if(typeof playSound==='function')playSound('wrong');}
  advTfI++;
  setTimeout(function(){advChTf(e,c);},350);
};
// ----- Victoire d'empire -----
function advChWin(){
  var e=ADV.empires[advE];
  xpTotal+=30;updateXP();
  if(typeof playSound==='function')playSound('levelup');
  if(typeof confettiBurst==='function')confettiBurst(false);
  if(typeof floatXP==='function')floatXP('+30 XP');
  var st=advState();
  var firstTime=st.done.indexOf(e.key)<0;
  if(firstTime)st.done.push(e.key);
  var perfect=advErr===0;
  if(perfect&&st.perfect.indexOf(e.key)<0){
    st.perfect.push(e.key);
    xpTotal+=50;updateXP();
    setTimeout(function(){if(typeof floatXP==='function')floatXP('+50 XP ✨');},500);
    if(typeof showToast==='function')showToast(advL(ADV_UI.perfect));
  }
  advSave(st);
  var owned=ownedTreasures();
  var newCard=!owned.has(e.card.id);
  if(newCard){owned.add(e.card.id);saveTreasures(owned);renderTreasureProgress();}
  advRefreshUI();
  advOpenMapDelayed();
  if(newCard){setTimeout(function(){showTreasureReveal(e.card);},600);}
  else if(!perfect){if(typeof showToast==='function')showToast(advL(ADV_UI.again));}
}
function advOpenMapDelayed(){setTimeout(function(){advOpenMap();},400);}

// ---------- 7. UI REFRESH (bannière + verrous thèmes) ----------
window.advRefreshUI=function(){
  var st=advState(),n=st.done.length;
  var ti=document.getElementById('adv-b-ti'),sub=document.getElementById('adv-b-sub'),
      cnt=document.getElementById('adv-b-count'),fill=document.getElementById('adv-b-fill'),
      nw=document.getElementById('adv-b-new');
  if(ti)ti.textContent='🗺️ '+advL(ADV_UI.banner);
  if(sub)sub.textContent=n>=4?advL(ADV_UI.bannerDone):advL(ADV_UI.bannerSub);
  if(cnt)cnt.textContent=n+'/4';
  if(fill)fill.style.width=(n/4*100)+'%';
  if(nw)nw.textContent=n===0?advL(ADV_UI.newTag):'';
  // verrous sur les cartes thèmes
  document.querySelectorAll('#t-learn .gcard').forEach(function(card){
    var oc=card.getAttribute('onclick')||'';
    var m=oc.match(/showIntro\('(\w+)'\)/);
    if(!m)return;
    var subj=m[1];
    var old=card.querySelector('.adv-lock');if(old)old.remove();
    if(THEME_REQ[subj]&&!advThemeUnlocked(subj)){
      card.style.opacity='.55';card.style.filter='grayscale(.5)';
      var s=document.createElement('span');
      s.className='lock adv-lock';s.textContent='🔒';
      card.appendChild(s);
    }else{card.style.opacity='';card.style.filter='';}
  });
};
// ---------- 8. INIT ----------
advRefreshUI();
renderTreasureProgress();
})();
