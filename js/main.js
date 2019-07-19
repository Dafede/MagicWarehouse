const cardList =[];
var readCardList = [];
$(document).ready(function () {
	
//UPLOAD FILE
function upload(){
  var x = $("#buttonUpload");
  var txt = "";
  if ('files' in x) {
    if (x.files.length == 0) {
      txt = "Select one or more files.";
    } else {
      for (var i = 0; i < x.files.length; i++) {
        txt += "<br><strong>" + (i+1) + ". file</strong><br>";
        var file = x.files[i];
        if ('name' in file) {
          txt += "name: " + file.name + "<br>";
        }
        if ('size' in file) {
          txt += "size: " + file.size + " bytes <br>";
        }
      }
    }
  } 
  else {
    if (x.value == "") {
      txt += "Select one or more files.";
    } else {
      txt += "Not Supported";
      txt  += "<br>The path of the selected file: " + x.value; 
    }
  }
  document.getElementById("demo").innerHTML = txt;
}


/*
jQuery('input[type=file]').change(function(){
 var filename = jQuery(this).val().split('\\').pop();
 var idname = jQuery(this).attr('id');
 console.log(jQuery(this));
 console.log(filename);
 console.log(idname);
 jQuery('span.'+idname).next().find('span').html(filename);
});


*/


/*
---CAMPOS---
"id				": "3313bd5c-b657-47a3-822a-dd0d9165492a",
"name			": "Healer's Hawk",
******"image_uris		": "https.//img...",
"lang			": "en",
"mana_cost		": "{W}",
"cmc			": 1.0,
"type_line		": "Creature — Bird",
"oracle_text	": "Flying, lifelink",
"power			": "1",
"toughness		": "1",
"colors			": ["W"],
"color_identity	": ["W"],
"set			": "grn",
collector_number
*/
/*

CODE	PRINTED CODE	LANGUAGE	CARDS
en		en				English		45,366
es		sp				Spanish		26,966
fr		fr				French		27,091
de		de				German		26,495
it		it				Italian		27,372
pt		pt				Portuguese	23,796
ja		jp				Japanese	28,980

*/

$("#buttonSearchCard").click(function( event ) {
  event.preventDefault();
	var lang = "";
	if($("#radioSpanish").is(':checked')) lang = "es";
	if($("#radioEnglish").is(':checked')) lang = "en";
	if($("#radioFrench").is(':checked')) lang = "fr";
	if($("#radioGerman").is(':checked')) lang = "de";
	if($("#radioItalian").is(':checked')) lang = "it";
	if($("#radioPortuguese").is(':checked')) lang = "pt";
	if($("#radioJapanese").is(':checked')) lang = "ja";
	


  $.getJSON('https://api.scryfall.com/cards/'+$("#inputEditionCode").html().toLowerCase()+'/'+$("#inputCardNumber").val()+'/'+lang, function(data) {
	  var card = {
		id: data.id,
		name: data.name,
		lang: data.lang,
		mana_cost: data.mana_cost,
		cmc: data.cmc,
		type_line: data.type_line,
		oracle_text: data.oracle_text,
		power: data.power,
		toughness: data.toughness,
		colors: data.colors,
		color_identity: data.color_identity,
		set: data.set,
		collector_number: data.collector_number,
		observations: ""
	};
	addCard(card);
	cardList.push(card);
});


});

$("#buttonDownload").click(function( event ) {
	  event.preventDefault();
	  download(cardList);
});

$("#buttonUpload").click(function( event ) {
	  //event.preventDefault();
	  //upload();
});


	
    $( "#inputEdition" ).autocomplete({
      source: availableTags,
	  minLength: 1,
	  select: function(event, ui) {
		    event.preventDefault();
            $("#inputEdition").val(ui.item[0]);
			$("#inputEditionCode").html(ui.item[1]);
			$("#inputEditionIcon").html(ui.item[2]);
        }
    })
	.data("ui-autocomplete")._renderItem = function( ul, item ) {		
    return $( "<div class='ui-auto-min-item'><li class='ui-autocomplete-row'>"+item[0]+" "+item[2]+" <span><b>"+item[1]+"</b></span></li></div>" )
        .appendTo( ul );
    };
});

var availableTags = [
["Alpha (Limited Edition)","LEA",""],
["Beta (Limited Edition)","LEB",""],
["Unlimited Edition","2ED",""],
["Arabian Nights","ARN",""],
["Antiquities","ATQ",""],
["Revised Edition","3ED",""],
["Legends","LEG",""],
["The Dark","DRK",""],
["Fallen Empires","FEM",""],
["Fourth Edition","4ED",""],
["Ice Age","ICE",""],
["Chronicles","CHR",""],
["Renaissance","",""],
["Homelands","HML",""],
["Alliances","ALL",""],
["Mirage","MIR",""],
["Visions","VIS",""],
["Fifth Edition","5ED",""],
["Portal","POR",""],
["Weatherlight","WTH",""],
["Tempest","TMP",""],
["Stronghold","STH",""],
["Exodus","EXO",""],
["Portal Second Age","P02",""],
["Unglued","UGL",""],
["Urza's Saga","USG",""],
["Anthologies","ATH",""],
["Urza's Legacy","ULG",""],
["Sixth Edition","6ED",""],
["Urza's Destiny","UDS",""],
["Portal Three Kingdoms","PTK",""],
["Starter 1999","S99",""],
["Mercadian Masques","MMQ",""],
["Battle Royale","BRB",""],
["Nemesis","NEM",""],
["Starter 2000","S00",""],
["Prophecy","PCY",""],
["Invasion","INV",""],
["Beatdown","BTD",""],
["Planeshift","PLS",""],
["Seventh Edition","7ED",""],
["Apocalypse","APC",""],
["Odyssey","ODY",""],
["Deckmasters 2001","DKM",""],
["Torment","TOR",""],
["Judgment","JUD",""],
["Onslaught","ONS",""],
["Legions","LGN",""],
["Scourge","SCG",""],
["Eighth Edition","8ED",""],
["Mirrodin","MRD",""],
["Darksteel","DST",""],
["Fifth Dawn","5DN",""],
["Champions of Kamigawa","CHK",""],
["Unhinged","UNH",""],
["Betrayers of Kamigawa","BOK",""],
["Saviors of Kamigawa","SOK",""],
["Ninth Edition","9ED",""],
["Salvat 2005","",""],
["Ravnica: City of Guilds","RAV",""],
["Guildpact","GPT",""],
["Dissension","DIS",""],
["Coldsnap","CSP",""],
["Time Spiral","TSP",""],
["Planar Chaos","PLC",""],
["Future Sight","FUT",""],
["Tenth Edition","10E",""],
["Masters Edition","MED",""],
["Lorwyn","LRW",""],
["Duel Decks: Elves vs. Goblins","EVG",""],
["Morningtide","MOR",""],
["Shadowmoor","SHM",""],
["Eventide","EVE",""],
["From the Vault: Dragons","DRB",""],
["Masters Edition II","ME2",""],
["Shards of Alara","ALA",""],
["Duel Decks: Jace vs. Chandra","DD2",""],
["Conflux","CON",""],
["Duel Decks: Divine vs. Demonic","DDC",""],
["Alara Reborn","ARB",""],
["Magic 2010","M10",""],
["Commander Theme Decks","TD0",""],
["From the Vault: Exiled","V09",""],
["Planechase","HOP",""],
["Masters Edition III","ME3",""],
["Zendikar","ZEN",""],
["Duel Decks: Garruk vs. Liliana","DDD",""],
["Premium Deck Series: Slivers","H09",""],
["Worldwake","WWK",""],
["Duel Decks: Phyrexia vs. The Coalition","DDE",""],
["Rise of the Eldrazi","ROE",""],
["Deck Builder's Toolkit","",""],
["Duels of the Planeswalkers","DPA",""],
["Archenemy","ARC",""],
["Magic 2011","M11",""],
["From the Vault: Relics","V10",""],
["Duel Decks: Elspeth vs. Tezzeret","DDF",""],
["Scars of Mirrodin","SOM",""],
["Magic Online Deck Series","TD0",""],
["Premium Deck Series: Fire & Lightning","PD2",""],
["Momir Basic Event Deck","",""],
["Salvat 2011","",""],
["Masters Edition IV","ME4",""],
["Mirrodin Besieged","MBS",""],
["Deck Builder's Toolkit 2011","",""],
["Duel Decks: Knights vs. Dragons","DDG",""],
["New Phyrexia","NPH",""],
["Commander","CMD",""],
["Magic 2012","M12",""],
["From the Vault: Legends","V11",""],
["Duel Decks: Ajani vs. Nicol Bolas","DDH",""],
["Innistrad","ISD",""],
["Premium Deck Series: Graveborn","PD3",""],
["Dark Ascension","DKA",""],
["Duel Decks: Venser vs. Koth","DDI",""],
["Avacyn Restored","AVR",""],
["Planechase 2012","PC2",""],
["Magic 2013","M13",""],
["From the Vault: Realms","V12",""],
["Duel Decks: Izzet vs. Golgari","DDJ",""],
["Return to Ravnica","RTR",""],
["Commander's Arsenal","CM1",""],
["Duel Decks: Mirrodin Pure vs. New Phyrexia","TD2",""],
["Gatecrash","GTC",""],
["Duel Decks: Sorin vs. Tibalt","DDK",""],
["Dragon's Maze","DGM",""],
["Modern Masters","MMA",""],
["Magic 2014","M14",""],
["From the Vault: Twenty","V13",""],
["Duel Decks: Heroes vs. Monsters","DDL",""],
["Theros","THS",""],
["Commander 2013","C13",""],
["Born of the Gods","BNG",""],
["Duel Decks: Jace vs. Vraska","DDM",""],
["Journey into Nyx","JOU",""],
["Modern Event Deck","MD1",""],
["Conspiracy","CNS",""],
["Vintage Masters","VMA",""],
["Magic 2015","M15",""],
["From the Vault: Annihilation","V14",""],
["Duel Decks: Speed vs. Cunning","DDN",""],
["Khans of Tarkir","KTK",""],
["Commander 2014","C14",""],
["Duel Decks Anthology","DD3",""],
["Fate Reforged","FRF",""],
["Duel Decks: Elspeth vs. Kiora","DDO",""],
["Dragons of Tarkir","DTK",""],
["Tempest Remastered","TPR",""],
["Modern Masters 2015","MM2",""],
["Magic Origins","ORI",""],
["From the Vault: Angels","V15",""],
["Duel Decks: Zendikar vs. Eldrazi","DDP",""],
["Battle for Zendikar","BFZ",""],
["Zendikar Expeditions","EXP",""],
["Commander 2015","C15",""],
["Legendary Cube","PZ1",""],
["Oath of the Gatewatch","OGW",""],
["Duel Decks: Blessed vs. Cursed","DDQ",""],
["Welcome Deck 2016","W16",""],
["Shadows over Innistrad","SOI",""],
["Eternal Masters","EMA",""],
["Eldritch Moon","EMN",""],
["From the Vault: Lore","V16",""],
["Conspiracy: Take the Crown","CN2",""],
["Duel Decks: Nissa vs. Ob Nixilis","DDR",""],
["Kaladesh","KLD",""],
["Kaladesh Inventions","MPS",""],
["Treasure Chests","PZ2",""],
["Commander 2016","C16",""],
["You Make the Cube","",""],
["Planechase Anthology","PCA",""],
["Aether Revolt","AER",""],
["Modern Masters 2017","MM3",""],
["Duel Decks: Mind vs. Might","DDS",""],
["Welcome Deck 2017","W17",""],
["Amonkhet","AKH",""],
["Amonkhet Invocations","MPS",""],
["Commander Anthology","CMA",""],
["Archenemy: Nicol Bolas","E01",""],
["Hour of Devastation","HOU",""],
["Commander 2017","C17",""],
["Ixalan","XLN",""],
["Duel Decks: Merfolk vs. Goblins","DDT",""],
["Iconic Masters","IMA",""],
["Explorers of Ixalan","E02",""],
["From the Vault: Transform","V17",""],
["Unstable","UST",""],
["Rivals of Ixalan","RIX","<i class='ss ss-rix'></i>"],
["Masters 25","A25",""],
["Duel Decks: Elves vs. Inventors","DDU",""],
["Challenger Decks","Q01",""],
["Dominaria","DOM","<i class='ss ss-dom'></i>"],
["Commander Anthology Volume II","CM2",""],
["Battlebond","BBD",""],
["Signature Spellbook: Jace","SS1",""],
["Global Series: Jiang Yanggu & Mu Yanling","GS1",""],
["Core Set 2019","M19",""],
["Commander 2018","C18",""],
["Guilds of Ravnica Mythic Edition","MED",""],
["Guilds of Ravnica","GRN","<i class='ss ss-grn'></i>"],
["Spellslinger Starter Kit","SK1",""],
["Guilds of Ravnica Guild Kits","GK1",""],
["Game Night","GNT",""],
["Ultimate Masters","UMA",""],
["Ravnica Allegiance Mythic Edition","MED",""],
["Ravnica Allegiance","RNA","<i class='ss ss-rna'></i>"],
["Ravnica Allegiance Guild Kits","GK2",""],
["Challenger Decks 2019","Q02",""],
["War of the Spark Mythic Edition","MED",""],
["War of the Spark","WAR","<i class='ss ss-war'></i>"],
["Modern Horizons","MH1","<i class='ss ss-mh1'></i>"],
["Signature Spellbook: Gideon","SS2",""],
["Core Set 2020","M20",""],
["Commander 2019","C19",""],
["Throne of Eldraine","",""]
];

function addCard(card){
	var cardSet = "<i class='ss ss-"+card.set+"'></i>";
	var baseColors = card.mana_cost.split("{");
	var manaCost = "";
	for (x = 1; x < baseColors.length; x++){
		switch (baseColors[x].charAt(0)) {	
		  case "W":
			manaCost += "<div class='white-cost'></div>";
			break;
		  case "U":
			manaCost += "<div class='blue-cost'></div>";
			break;
		  case "B":
			manaCost += "<div class='black-cost'></div>";
			break;
		  case "R":
			manaCost += "<div class='red-cost'></div>";
			break;
		  case "G":
			manaCost += "<div class='green-cost'></div>";
			break;			
		  default:
			manaCost += "<div class='incolore-cost'>"+baseColors[x].charAt(0)+"</div>";
		}	
	}
	//color-type-other
	//card-image-other
	var colorType = "";
	var colorImage = "";
	if (card.color_identity.length > 1){
		colorType += "<div class='magic-card "+"color-type-other"+"'>";
		colorImage = "<div class='card-image-other'></div>";
	}
	else{
		switch (card.color_identity[0]) {	
		  case "W":
			colorType += "<div class='magic-card "+"color-type-white"+"'>";
			colorImage = "<div class='card-image-white'></div>";
			break;
		  case "U":
			colorType += "<div class='magic-card "+"color-type-blue"+"'>";
			colorImage = "<div class='card-image-blue'></div>";
			break;
		  case "B":
			colorType += "<div class='magic-card "+"color-type-black"+"'>";
			colorImage = "<div class='card-image-black'></div>";
			break;
		  case "R":
			colorType += "<div class='magic-card "+"color-type-red"+"'>";
			colorImage = "<div class='card-image-red'></div>";
			break;
		  case "G":
			colorType += "<div class='magic-card "+"color-type-green"+"'>";
			colorImage = "<div class='card-image-green'></div>";
			break;			
		  default:
			colorType += "<div class='magic-card'>";
			colorImage = "<div class='card-image'></div>";
		}
	}
	

	var htmlCard = colorType +
			`
					<div class="card-name-cost row">
						<div class="card-name-cost-name">
						`
						+
						card.name
						+
						`
						</div>
						<div class="card-name-cost-cost row">
						`
						+
						manaCost
						+
						`
						</div>
					</div>
					
					`
						+
					colorImage
					+
						`
					
					<div class="card-type-set row">
						<div class="card-type-set-type">
						`
						+
						card.type_line
						+
						`
						</div>
						<div class="card-type-set-set">GRN
						`
						+
						cardSet
						+
						`
						</div>
					</div>
					<div class="card-text">
					`
					+
					card.oracle_text
					+	
					`
					</div>
					<div class="card-collector-force row">
						<div class="card-collector-force-collector">
						`
						+
						card.collector_number
						+
						`
						</div>
						<div class="card-collector-force-force">
						`
						+
						card.power
						+"/"+		
						card.toughness	
						+
						`
						</div>
					</div>
				</div>
	`
	$("#cardCollectionSection").append(htmlCard);
}


//DOWNLOAD FILE
function download(cardlisto) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent( JSON.stringify(cardlisto)));
    element.setAttribute('download', "MagicWarehouseCardList.txt");

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

function uploaded(){
	var input = document.getElementById('buttonUpload');
	file = input.files[0];
	fr = new FileReader();
	//readAsText is asynchronous, so you would need to use the onload callback to see the result.
	fr.onload = function(e) {
		readCardList = JSON.parse(fr.result);
		loadCards(readCardList);
	};
	fr.readAsText(file);
}

function loadCards(readCardList){
	for (k = 0; k < readCardList.length; k++){
		addCard(readCardList[k]);
	}
}
