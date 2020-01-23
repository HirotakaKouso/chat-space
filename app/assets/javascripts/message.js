$(function(){ 

  var buildHTML= function(message) {
   if ( message.content && message.image) {
     var html =
      `<div class="message_box" data-message-id= ${message.id} >
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
         <img src = ${message.image} >
       </div>`
     return html;
   } else if (message.content) {
     var html =
       `<div class="message_box" data-message-id= ${message.id} >
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
    } else if (message.image) {
      var html =
        `<div class="message_box" data-message-id= ${message.id} >
           <div class="submit">
             ${message.user_name}
             <div class="submit-right">
               ${message.created_at}
             </div>
           </div>
           <div class="comment">
             <p class="lower-message__content">
               <img src = ${message.image} >
             </p>
           </div>
         </div>`
   };
   return html;
  };

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    console.log(formData)
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
       $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
     })
     .fail(function() {
       alert("メッセージ送信に失敗しました");
     })
     .always(function() {
       $('.send__btn').prop('disabled', false);
     });
  });

    var reloadMessages = function() {
      last_message_id = $('.message:last').data("message-id");
      $.ajax({
        url: "api/messages",
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages) {
        if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.chat-main__message-list').append(insertHTML);
        $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
        $("#new_message")[0].reset();
        $(".send__btn").prop("disabled", false);
      }
      })
      .fail(function() {
        console.log('error');
      });
    };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 4000);
  }
});