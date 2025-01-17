const express = require("express");
const router = express.Router();

const emergencyContactsModel = require("../models/emergencyContacts");

// route for adding emergency contacts

router.post("/addEmergencyContacts", async (req, res) => {
  try {
    // const {contact} = req.body;
    const { username, contact } = req.body;

    if (!username) {
      return (
        res.status(400),
        json({
          message: "username not found",
        })
      );
    }

    if (!contact) {
      return (
        res.status(400),
        json({
          message: "EmergencyContact not found",
        })
      );
    }

    const emergencyContacts = await emergencyContactsModel.findOne({
      // userId: req.user.userId,
      username,
    });
    console.log(emergencyContacts);

    if (!emergencyContacts) {
      const newEmergecnyContact = new emergencyContactsModel({
        // userId: req.user.id,
        username: username,
        contacts: [contact],
      });
      await newEmergecnyContact.save();
      return res.status(200).json({
        message: "Emergency Contacts added Successfully",
      });
    } else {
      emergencyContacts.contacts = [...emergencyContacts.contacts, contact];

      await emergencyContacts.save();
      return res.status(200).json({
        message: "Emergency Contacts added Successfully",
      });
    }
  } catch (err) {
    console.log("Error = ", err);
    return res.status(500).json({
      message: "Internal Server Error: Emergency Contacts not added ",
    });
  }
});

// route for getting all emergency contacts

router.get("/getEmergencyContacts", async (req, res) => {
  try {
        const {username} = req.body;

        if(!username){
            return res.status(400).json({
                message: 'Username not found',
            })
        }

        const details = await emergencyContactsModel.findOne({
            username,
        });

        if(!details){
            return res.status(400).json({
                message: 'NO Emergency Contacts found',
            })
        }

        return res.status(200).json({
            contacts: details.contacts,
            message: 'Emergency Contacts send successfully'
        });


  } catch (err) {
    console.log("Error = ", err);
    return res.status(500).json({
      message: "Internal Server Error: Emergency Contacts not added ",
    });
  }
});

// route for editing a emergency contact


// route for deleting an emergency contact

router.post('/deleteContact', async (req, res) => {
    try{
        const {username, contactToDelete} = req.body;

        if(!username){
            return res.status(400).json({
                message: 'Username not found',
            });
        }

        if(!contactToDelete){
            return res.status(400).json({
                message: 'Contact not found in body of request',
            });
        }

        const emergencyDetails = await emergencyContactsModel.findOne({username});
        if(!emergencyDetails){
            return res.status(400).json({
                message: 'No Contact to delete',
            });
        }

        const indexOfContactToDelete = emergencyDetails.contacts.findIndex((contact) => contact.name === contactToDelete.name);

        if(indexOfContactToDelete === -1){
            return res.status(400).json({
                message: 'Contact not found to delete',
            });
        }

        emergencyDetails.contacts.splice(indexOfContactToDelete, 1);
        await emergencyDetails.save();
        return res.status(200).json({
            message: 'Emergency Contacts deleted successfully'
        });

    }
    catch(err){
        console.log('Error = ', err);
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    }
})

module.exports = router;
