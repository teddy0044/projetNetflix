function getListeSeries(table){
	var xmlHttpSeries = getAjaxRequestObject();
	xmlHttpSeries.onreadystatechange = function() {
		if (this.readyState === 4 && this.status === 200) {
			var text= this.responseText;
			var lesSeries = JSON.parse(text);
			lesSeries.sort(function(a, b){
				if (a.nom < b.nom){
					return -1;
				}else if (a.nom > b.nom){
					return 1;
				}else{
					return 0;
				}
			});

			for(var i=0;i<lesSeries.length;i++){
				var row = table.insertRow(i);
				var cellnom = row.insertCell(0);
				var cellannee = row.insertCell(1);
				var cellSaisons = row.insertCell(2);
				cellnom.innerText = lesSeries[i].nom;
				cellannee.innerText = lesSeries[i].anneeparution;
				getNbSaisons(lesSeries[i].id, cellSaisons);
				row.setAttribute("tag", lesSeries[i].id);
				cellnom.style.textAlign = "left";
				cellnom.style.paddingLeft = "10px";

				row.onclick = function(){
					getSaisons(this.getAttribute("tag"));
				}
			}
		}
	};
	xmlHttpSeries.open("GET", "../api-netflix/api.php?data=series");
	xmlHttpSeries.send();
}

function getSaisons(id){
	console.log(id);
	var xmlHttpSaisons = getAjaxRequestObject();
	xmlHttpSaisons.onreadystatechange = function(){
		if (this.readyState === 4 && this.status === 200){
			try{
				console.log(JSON.parse(this.responseText));
			}catch (e){
				console.log('Pas de saisons');
			}
		}
	};
	xmlHttpSaisons.open("GET", "../api-netflix/api.php?data=saisons&idserie=" + id);
	xmlHttpSaisons.send();
}

function getNbSaisons(id, cellule){
	var nbSaisons = 0;
	var xmlHttpSaisons = getAjaxRequestObject();
	xmlHttpSaisons.onreadystatechange = function(){
		if (this.readyState === 4 && this.status === 200){
			try{
				nbSaisons = JSON.parse(this.responseText).length;
			}catch (e){
				nbSaisons = 0;
			}
			cellule.innerText = nbSaisons;
		}
	};
	xmlHttpSaisons.open("GET", "../api-netflix/api.php?data=saisons&idserie=" + id);
	xmlHttpSaisons.send();
}