$(document).ready(function () {
	var cnt = 0;
  $.ajax({
    url: "movies.xml",
    dataType: "xml",
    success: function (data) {
      alert("File is loaded !");
      $("table").append(
        "<thead><tr><th scope='col'>Title</th><th scope='col'>Genre</th><th scope='col'>Director</th><th scope='col'>Cast</th><th scope='col'>Short Description</th><th scope='col'>IMDB</th></tr></thead>"
      );
	  
      $(data)
        .find("movie")
        .each(function () {
			cnt++;
          var title = $(this).find("title").text();
          var dir = $(this).find("director").text();
          var synopsis = $(this).find("imdb-info").find("synopsis").text();
          var rating = $(this).find("imdb-info").find("score").text();
          var genre = "";
          $(this)
            .find("genre")
            .each(function (index) {
              genre += $(this).text() + ", ";
            });
          genre = genre.slice(0, genre.length - 2);
          var cast = "";
          $(this)
            .find("cast")
            .find("person")
            .each(function (index) {
              cast += $(this).attr("name") + ", ";
            });
          cast = cast.slice(0, cast.length - 2);
		  var info;
		  if (cnt%2===1){
         info =
          "<tbody>" + 
            "<tr style='background-color:#686868'><td>" +
            title +
            "</td><td>" +
            genre +
            "</td><td>" +
            dir +
            "</td><td>" +
            cast +
            "</td><td>" +
            synopsis +
            "</td><td>" +
            rating +
            "</td></tr></tbody>";
		}else{
          info =
          "<tbody>" + 
            "<tr><td>" +
            title +
            "</td><td>" +
            genre +
            "</td><td>" +
            dir +
            "</td><td>" +
            cast +
            "</td><td>" +
            synopsis +
            "</td><td>" +
            rating +
            "</td></tr></tbody>";
		}
          $("table").append(info);
        });
    },
    error: function () {
      alert("Error in loading file");
    },
  });
});
