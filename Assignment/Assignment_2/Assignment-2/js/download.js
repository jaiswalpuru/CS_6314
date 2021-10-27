$(document).ready(function () {
  $.ajax({
    url: "js/data.json",
    dataType: "json",
    success: function (data) {
      $.each(data, function (key, val) {
        temp = val.title.split(" ");
        title = temp.join(",");
        $("#img_div").append(
          "<img id=" +
            val.id +
            " alt=" +
            title +
            " src=./images/square/" +
            val.path +
            " style='padding:1em'  name=" +
            val.path +
            ">"
        );
      });
      var mouseEnterId = 0;

      $("#img_div").on("mouseenter", "img", function (event) {
        console.log($(this)[0].id);
        mouseEnterId = $(this)[0].id;
        $("#" + $(this)[0].id).addClass("gray");
        $("#imagepreview").attr("src", "./images/medium/" + $(this)[0].name); // here asign the image to the modal when the user click the enlarge link
        $("#image_name").html($(this)[0].alt.split(",").join(" "));
        $("#imagemodal").modal("show"); // imagemodal is the id attribute assigned to the bootstrap modal, then i use the show function

        $(".modal").css('display','inline-block');
        var x = event.pageX - $(this).parent().offset().left;
          var y = event.pageY - $(this).parent().offset().top;
          $(".modal").css({ top: y-10, left: x-10 });
      });

      $("#imagemodal").mouseleave(function () {
        $("#" + mouseEnterId).removeClass("gray");
        $("#imagemodal").modal("hide");
      });

      $("#imagemodal").mousemove(function (event) {
        var x_coordinate = event.pageX;
        var y_coordinate = event.pageY;
        $("#imagemodal").css({'left':x_coordinate,'top':y_coordinate});
      });
    },
    error: function () {
      alert("Error in loading file.");
    },
  });
});
