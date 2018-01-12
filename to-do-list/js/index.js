$(document).ready(function(){
  
  $("input[type='text']").keypress(function(e){
    if(e.which === 13) {
      e.preventDefault();
      //creating a variable to hold the value of the input
      var listItem = $('input[name=checkListItem]').val();
      if(listItem){
        // appending the ordered list along with the input value stored in the variable listItem and a cross as a delete button
        $('ol').append('<li><div class="item">' + listItem + '<div class="delete">X</div></li></div>');
        // this will reset the input box after you add the item to the list
        $("form")[0].reset();
      } 
    }
  });

// following will erase the item from the list when you click on the cross fading out slowly.
  $(document).on('click','.delete',function(){
    $(this).closest('li').css('text-decoration','line-through').fadeOut('slow');    
  });
});