const cardList = [];
var readCardList = [];
var d = new Date();
$(document).ready(function() {
	$("#buttonSearchCard").click(function(event) {
		event.preventDefault();
		var lang = "";
		if ($("#radioSpanish").is(':checked')) lang = "es";
		if ($("#radioEnglish").is(':checked')) lang = "en";
		if ($("#radioFrench").is(':checked')) lang = "fr";
		if ($("#radioGerman").is(':checked')) lang = "de";
		if ($("#radioItalian").is(':checked')) lang = "it";
		if ($("#radioPortuguese").is(':checked')) lang = "pt";
		if ($("#radioJapanese").is(':checked')) lang = "ja";

		$.getJSON('https://api.scryfall.com/cards/' + $("#inputEditionCode").html().toLowerCase() + '/' + $("#inputCardNumber").val() + '/' + lang, function(data) {
			var card = {
				id: data.id,
				id_time: d.getTime(),
				name: data.name,
				image_uris_small: data.image_uris.small,
				image_uris_normal: data.image_uris.normal,
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
			addCardImage(card);
			cardList.push(card);
		});
	});

	$("#buttonDownload").click(function(event) {
		event.preventDefault();
		download(cardList);
	});

	$("#inputEdition").autocomplete({
			source: availableTags,
			minLength: 1,
			select: function(event, ui) {
				event.preventDefault();
				$("#inputEdition").val(ui.item[0]);
				$("#inputEditionCode").html(ui.item[1]);
				$("#inputEditionIcon").html(ui.item[2]);
			}
		})
		.data("ui-autocomplete")._renderItem = function(ul, item) {
			return $("<div class='ui-auto-min-item'><li class='ui-autocomplete-row'>" + item[0] + " " + item[2] + " <span><b>" + item[1] + "</b></span></li></div>")
				.appendTo(ul);
		};
		
		$("#inputEditionFilter").autocomplete({
			source: availableTags,
			minLength: 1,
			select: function(event, ui) {
				event.preventDefault();
				$("#inputEditionFilter").val(ui.item[0]);
				$("#inputEditionCodeFilter").html(ui.item[1]);
				$("#inputEditionIconFilter").html(ui.item[2]);
			}
		})
		.data("ui-autocomplete")._renderItem = function(ul, item) {
			return $("<div class='ui-auto-min-item'><li class='ui-autocomplete-row'>" + item[0] + " " + item[2] + " <span><b>" + item[1] + "</b></span></li></div>")
				.appendTo(ul);
		};
		
		
		$(".dropdownColor div .blue").click(function(event) {
			event.preventDefault();
			$("#dropdownMenuButtonColor").html("Blue");
			$("#dropdownMenuButtonColor").css("background-color", "#AAE0FA");
			filterByColor("U");
		});
		$(".dropdownColor div .red").click(function(event) {
			event.preventDefault();
			$("#dropdownMenuButtonColor").html("Red");
			$("#dropdownMenuButtonColor").css("background-color", "#F9AA8F");
			filterByColor("R");
		});
		$(".dropdownColor div .black").click(function(event) {
			event.preventDefault();
			$("#dropdownMenuButtonColor").html("Black");
			$("#dropdownMenuButtonColor").css("background-color", "#CBC2BF");
			filterByColor("B");
		});
		$(".dropdownColor div .white").click(function(event) {
			event.preventDefault();
			$("#dropdownMenuButtonColor").html("White");
			$("#dropdownMenuButtonColor").css("background-color", "#FFFBD5");
			filterByColor("W");
		});
		$(".dropdownColor div .green").click(function(event) {
			event.preventDefault();
			$("#dropdownMenuButtonColor").html("Green");
			$("#dropdownMenuButtonColor").css("background-color", "#9BD3AE");
			filterByColor("G");
		});
		$(".dropdownColor div .all").click(function(event) {
			event.preventDefault();
			$("#dropdownMenuButtonColor").html("All");
			$("#dropdownMenuButtonColor").css("background-color", "#6c757d");
			filterByColor("A");
		});
		
});

function addCardImage(card) {
	var imgFull =
		`
	<div class='image-card-collection-container' id='
	` +
		card.id_time +
		`
	'><div class='image-card-collection-above'>
		<div class='image-card-collection-above-observations' contenteditable='true'>
		` +
		card.observations +
		`
		</div>
		<div class='image-card-collection-above-delete'><span class="image-card-collection-above-delete-span"><b>DELETE</b></span></div>
	
	</div><img class='image-card-collection' src=
	` +
		card.image_uris_small +
		`
	/></div>
	`;
	$("#cardCollectionSection").append(imgFull);
	
	// Events pinned to this card added
	$(".image-card-collection").mouseenter(function() {
		$(this).siblings(".image-card-collection-above").show();
	});
	$(".image-card-collection-above").mouseleave(function() {
		saveObservations($(this).parent(".image-card-collection-container").attr( "id" ),       $(this).children(".image-card-collection-above-observations").html());
		$(this).hide();
	});
	$(".image-card-collection-above-delete-span").click(function(event) {
		event.preventDefault();
		$(this).parent(".image-card-collection-above-delete").parent(".image-card-collection-above").parent(".image-card-collection-container").remove();
		deleteCardFromLisst($(this).parent(".image-card-collection-above-delete").parent(".image-card-collection-above").parent(".image-card-collection-container").attr( "id" ));
	});

}

function download(cardlisto) {
	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(cardlisto)));
	element.setAttribute('download', "MagicWarehouseCardList.txt");
	element.style.display = 'none';
	document.body.appendChild(element);
	element.click();
	document.body.removeChild(element);
}

function uploaded() {
	var input = document.getElementById('buttonUpload');
	file = input.files[0];
	fr = new FileReader();
	fr.onload = function(e) {
		readCardList = JSON.parse(fr.result);
		loadCards(readCardList);
	};
	fr.readAsText(file);
}

function loadCards(readCardList) {
	for (k = 0; k < readCardList.length; k++) {
		setTimeout(addCardImage, 50, readCardList[k]);
	}
}

function deleteCardFromLisst(idDelete){
	for (w = 0; w < cardList.length; w++) {
		if(cardList[w].id_time = idDelete){
			cardList.splice(w, 1); 
		}
	}
}

function saveObservations(idObs, obs){
	for (w = 0; w < cardList.length; w++) {
		if(cardList[w].id_time = idObs){
			cardList[w].observations = obs;
		}
	}
}

function filterByColor(color){
	var listCardChild = $("#cardCollectionSection").children();
	if("A" == color) {
		for (j= 0; j < listCardChild.length; j++) {	
			$(listCardChild[j]).show();
		}
	}else{
		for (q = 0; q < cardList.length; q++) {	
			for (y = 0; y < cardList[q].colors.length; y++) {
				if (cardList[q].colors[y] != color){
					$(listCardChild[q]).hide();
				}else{
					$(listCardChild[q]).show();
					break;
				}
			}
		}
	}

}