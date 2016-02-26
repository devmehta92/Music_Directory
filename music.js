// Put your Last.fm API key here
var api_key = "";

function sendRequest1 () {
    var xhr = new XMLHttpRequest();
    var method = "artist.getInfo";
    var artist = encodeURI(document.getElementById("form-input").value);
    xhr.open("GET", "proxy.php?method="+method+"&artist="+artist+"&api_key="+api_key+"&format=json", true);
    xhr.setRequestHeader("Accept","application/json");
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            var json = JSON.parse(this.responseText);
            var str1 = JSON.stringify(json,undefined,2);
			str=json.artist.name;
			var link="<a href="+json.artist.url+">Artist LAST FM  Link</a>";
			var content=json.artist.bio.content;
			var img="<img src="+json.artist.image[2]['#text']+"></img>";
            document.getElementById("output1").innerHTML =  "<h1>"+ str +"</h1>"  + img + "<br>"+ link + "<br>"+ content;
			sendRequest2();
        }
    };
    xhr.send(null);
}
function sendRequest2 () {
    var xhr = new XMLHttpRequest();
    var method = "artist.getSimilar";
    var artist = encodeURI(document.getElementById("form-input").value);
    xhr.open("GET", "proxy.php?method="+method+"&artist="+artist+"&api_key="+api_key+"&format=json", true);
    xhr.setRequestHeader("Accept","application/json");
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            var json = JSON.parse(this.responseText);
            var str = JSON.stringify(json,undefined,2);
			var rel=json.similarartists.artist;
			var name="";
			for(var i=0;i<rel.length;i++)
			{
				name=name+rel[i].name+"</br>";
			}
            document.getElementById("output3").innerHTML = "<h1>Similar Artists</h1>" + name ;
			sendRequest3();
        }
    };
    xhr.send(null);
}
function sendRequest3 () {
    var xhr = new XMLHttpRequest();
    var method = "artist.getTopAlbums";
    var artist = encodeURI(document.getElementById("form-input").value);
    xhr.open("GET", "proxy.php?method="+method+"&artist="+artist+"&api_key="+api_key+"&format=json", true);
    xhr.setRequestHeader("Accept","application/json");
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            var json = JSON.parse(this.responseText);
            var str = JSON.stringify(json,undefined,2);
			var name="";
			var rel=json.topalbums.album;
			for(var i=0;i<json.topalbums.album.length;i++)
			{
				name=name+"<div class='test_fig'><img src='"+rel[i].image[2]['#text']+"'><p class='test_fig_p'>"+rel[i].name+"</p></div>";
			}
			document.getElementById("output2").innerHTML = "<h1>Top Albums</h1>" + name;
        }
    };
    xhr.send(null);
}
