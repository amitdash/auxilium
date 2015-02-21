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
    submitQuestion: function () {
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
        urgency: this.$.paper_slider.value,
        timestamp: new Date().toDateString()
      });
      this.$.room_input.value = '';
      this.$.problem_input.value = '';
      this.$.paper_slider.value = '';
      this.$.problem_input_wrapper.update();

      this.$.ticket_toast.show();
    },
    inputAction: function (e) {
      this.$.room_check.isInvalid = !e.target.validity.valid;
    }
//    END MY-CLAIMS DATA
  });
})();
