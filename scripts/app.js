var ref = new Firebase("https://vivid-fire-7477.firebaseio.com/tickets");
function test(word) {
  alert(word);
}

function markFixed(id) {
  var ticket = ref.child(id);
  ticket.update({
    status: 'closed'
  });
}

(function () {
  'use strict';
  Polymer({
//    BEGIN PVC GLOBALS, FIREBASE AND GENERAL DATA
    ready: function () {
      this.globals.firebase = 'vivid-fire-7477';
    },
    login: function () {
      this.$.baseLogin.login();
    },
    logout: function () {
      this.$.baseLogin.logout();
      window.location.reload();
    },
    onLogin: function () {
      this.globals.currentUser = this.user;
    },
    onLoginError: function (err) {
      console.log('An error occurred.');
    },
//    END PVC GLOBALS, FIREBASE AND GENERAL DATA

//    BEGIN MY-CLAIMS DATA
    submitTicket: function () {
      if(!this.$.room_input.value){
        alert('Please enter a room #!');
        return;
      }
      if(!this.$.problem_input.value){
        alert('Please describe your problem!');
        return;
      }
      var ticket = this.$.base.push({
        name: this.globals.currentUser.google.displayName,
        user_metadata: {
          avatar_url: this.globals.currentUser.google.cachedUserProfile.picture,
          html_url: this.globals.currentUser.google.id
        },
        room: this.$.room_input.value,
        problem: this.$.problem_input.value,
        urgency: this.$.urgency_slider.value,
        timestamp: new Date().toString(),
        status: 'open'
      });
      var ticketid = ticket.key();
      var ticketRef = ref.child(ticketid);
      ticketRef.update({
        ticketid: ticketid
      });
      this.$.room_input.value = '';
      this.$.problem_input.value = '';
      this.$.urgency_slider.value = '';
      this.$.problem_input_wrapper.update();

      this.$.ticket_toast.show();

      var ref1 = new Firebase("https://vivid-fire-7477.firebaseio.com/");
      ref1.child('counter').transaction(function(count){
        return (count || 0) + 1;
      });

      ref.on('child_changed', function(snapshot) {
        notifyMe();
      });
    },
//    END MY-CLAIMS DATA

//    BEGIN CLAIM-LIST DATA
    markFixed: function () {
      alert(1);
    },
    doThis: function () {
//      this.$.base.orderByChild("urgency").limitToLast(4).on("child_added", function(snapshot) {
//        console.log(snapshot.key());
//      });
      var ref = new Firebase("https://vivid-fire-7477.firebaseio.com/tickets");
      ref.orderByChild("urgency").limitToLast(40).on("child_added", function(snapshot) {
        console.log(snapshot.val().problem);
      });
    }
//    markFixed: function () {
////      var ticket = ref.child(id);
////      ticket.update({
////        status: 'closed'
////      });
////      this.$.fixed_toast.show();
////      var element = this.$.fix_button;
////      var id = element.getAttribute('data-ticketId');
//      console.log('id');
//    }

//    END CLAIM-LIST DATA
  });


  function notifyMe() {
    if (Notification.permission === "granted") {
          var options = {
                  body: "Please visit Auxilium to view it.",
                  icon: "icon.jpg",
                  dir : "ltr"
               };
            var notification = new Notification("New Ticket Received!",options);
    }
    else if (Notification.permission !== 'denied') {
      Notification.requestPermission(function (permission) {
        if (!('permission' in Notification)) {
          Notification.permission = permission;
        }

        if (permission === "granted") {
          var options = {
                body: "Please visit Auxilium to view it.",
                icon: "icon.jpg",
                dir : "ltr"
            };
          var notification = new Notification("New Ticket Received!",options);
        }
      });
    }


  }
})();
