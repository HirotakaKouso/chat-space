$(function(){ 
  function buildHTML(message){
   if ( message.image ) {
     var html =
      `<div class="message_box">
         <div class="submit">
           ${message.user_name}
           <div class="submit-right">
             ${message.created_at}
           </div>
         </div>
         
         <div class="comment">
           <p class="lower-message__content">
             ${message.content}
           </p>
         </div>
         <img src=${message.image} >
       </div>`
      return html;
   } else {
      var html =
        `<div class="message_box">
          <div class="submit">
            ${message.user_name}
            <div class="submit-right">
              ${message.created_at}
            </div>
          </div>
        
          <div class="comment">
            <p class="lower-message__content">
            ${message.content}
            </p>
          </div>
        </div>`
      return html;
   };
 }
$('#new_message').on('submit', function(e){
 e.preventDefault();
 var formData = new FormData(this);
 var url = $(this).attr('action')
 $.ajax({
   url: url,
   type: "POST",
   data: formData,
   dataType: 'json',
   processData: false,
   contentType: false
 })
  .done(function(data){
    var html = buildHTML(data);
    $('.chat-main__message-list').append(html);
    $('form')[0].reset();
    $('.send__btn').prop('disabled', false);
  })
  .fail(function() {
    alert("メッセージ送信に失敗しました");
});
  $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
})
});