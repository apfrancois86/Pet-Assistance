$(document).ready(function(){
  $(".top-scroll").click(function() {
    $("html, body").animate({ scrollTop: 0 }, "slow");
    return false;
  });
});
