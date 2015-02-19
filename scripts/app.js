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
    claimStuff: function () {
      this.$.toast1.show();
    },
    submitQuestion: function () {
      var ticket = this.$.base.push({
        name: this.globals.currentUser.google.displayName,
        room: this.$.room_input.value,
        problem: this.$.problem_input.value,
        urgency: this.$.paper_slider.value,
        timestamp: new Date().toDateString()
      });
      this.$.room_input.value = '';
      this.$.problem_input.value = '';
      this.$.paper_slider.value = '';
      this.$.problem_input_wrapper.update();
    },
    swap: function () {
      this.$.ticket_form.style.display = 'none';
      this.$.ticket_list.style.display = 'block';
    },
    inputAction: function (e) {
      this.$.room_check.isInvalid = !e.target.validity.valid;
    }
//    END MY-CLAIMS DATA
  });
})();
