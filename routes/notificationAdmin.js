var express = require('express');
var router = express.Router();
const auth = require('../controller/auth');
const notificationAdminSchema = require('../models/notification-admin.model');

router.get('/see-all-notifications', auth, function (req, res) {
  notificationAdminSchema.find()
    .then(notifs => {
      console.log(notifs);
      res.send(notifs)
    })
    .catch(error => { res.send(error) })
});

router.get('/delete-notification/:idNotif', auth, function (req, res) {
  let id = req.params.idNotif;

  notificationAdminSchema.findByIdAndRemove(id)
    .then(notifs => { res.status(200) })
    .catch(error => { res.status(500).json({ error }) })
});


router.post('/send-notification', auth, function (req, res) {
  let notification = req.body.notification;

  const newNotif = new notificationAdminSchema({
    auteur: notification.auteur,
    description: notification.description,
    experience: notification.experience
  })

  newNotif.save()
    .then(() => res.status(201).json({ message: 'notification sent' }))
    .catch(error => {
      console.log(error)
      res.send(error)
    })

});


module.exports = router;
