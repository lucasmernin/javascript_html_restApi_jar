$(document).ready(function() {
loadItems();
$('#allItems').addClass('itemSelection');

$('#add-dollar').click(function(event){
  var dollar = parseFloat(1);
  var total = parseFloat($('#displayMoneyIn').val() + 0);
  $('#displayMoneyIn').val((total + dollar).toFixed(2));
});

$('#add-quarter').click(function(event){
  var total = parseFloat($('#displayMoneyIn').val() + 0);
  $('#displayMoneyIn').val((total + .25).toFixed(2));
});

$('#add-dime').click(function(event){
  var total = parseFloat($('#displayMoneyIn').val() + 0);
  $('#displayMoneyIn').val((total + .10).toFixed(2));
});

$('#add-nickel').click(function(event){
  var total = parseFloat($('#displayMoneyIn').val() + 0);
  $('#displayMoneyIn').val((total + .05).toFixed(2));
});



$('#make-purchase').click(function(event){
vendAnItem();
});

$('#change-return').click(function(event){
  $('#displayChange').val("");
});

}); // End of run Method



function loadItems() {
  var contentRows = $('#allItems');
  $.ajax({
    type: 'GET',
    url: 'http://localhost:8080/items',
    success: function(itemArray) {


      $.each(itemArray, function(index, item) {
        var id = item.id;
        var name = item.name;
        var price = item.price;
        var quantity = item.quantity;

        var item = "<button class=' button selecta col-md-4' type='button' value='"+ id +"'><div class='itemField' class='col-md-4'>";
          item += "<div class='itemField' class='col-md-4' id='itemId'>";
          item += "<h3>" + id + "</h3>";
          item += "</div>";
          item += "<div class='itemField' class='col-md-4' id='itemName'>"
          item += "<h3>" + name + "</h3>";
          item += "</div>";
          item += "<div class='itemField' class='col-md-4' id='itemPrice'>"
          item += "<h3>" + price + "</h3>";
          item += "</div>";
          item += "<div class='itemField' class='col-md-4' id='itemQuantity'>";
          item += "<h3>" + quantity + "</h3>";
          item +="</div>"
          item += "</div></button>";

        contentRows.append(item);
      });
      $('.selecta').click(function(event){
        $('#displayItemId').val($(this).val());
      });
    },
      error: function() {
        alert("FAILURE!");
      }
  });
}; // end of LoadItems()

function vendAnItem() {

  var itemSelected = $('#displayItemId').val();
  var amount = parseFloat($('#displayMoneyIn').val() + 0);

$.ajax({
  type:'GET',
  url:'http://localhost:8080/money/'+ amount +'/item/'+ itemSelected +'',
  success: function(data){

      $('#displayChange').val("nickels: " + data.nickels + " dimes: " + data.dimes + " quarters: " + data.quarters)
      $('#displayItemId').val("");
      $('#displayMoneyIn').val(0);
      $('#allItems').empty();
      loadItems()


  },
  error: function(jqXHR) {
    $('#displayMessages').val(jqXHR.responseJSON.message);
  },

});
}; //end of vendAnItem()
