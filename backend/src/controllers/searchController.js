const User = require('../models/User');

// GET api/v1/search
const getUsers = async (req, res) => {
  const {userId} = req.user;
  const {email} = req.query;

  try {
    if (email) {
      const user = await User.findOne({email}, '_id email');

      if (!user) {
        return res.status(404).json({message: 'user not foun'});
      }
      const {_id} = user;

      if (_id.toString() === userId) {
        return res.status(400).json({message: 'It is you'});
      }

      return res.json({user});
    }

    const users = await User.find({_id: {$ne: userId}});
    res.json({users});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

// POST api/v1/search
const findUser = async (req, res) => {
  const {userId} = req.user;

  const {receiverEmail} = req.body;
  const {senderIdToAccept} = req.body;
  const {senderIdToCencel} = req.body;

  try {
    // Send request to friend by email
    if (receiverEmail) {
      const addSenderIdToIncomeRequestsPromise = User.updateOne(
        {
          email: receiverEmail,
          'incomeRequests.userId': {$ne: userId},
          'friendsList.friendId': {$ne: userId},
        },
        {
          $push: {
            incomeRequests: {
              userId,
            },
          },
        },
      );

      const addReceiverEmailToOutcomeRequestsPromise = User.updateOne(
        {
          _id: userId,
          'outcomeRequests.email': {$ne: receiverEmail},
        },
        {
          $push: {
            outcomeRequests: {
              email: receiverEmail,
            },
          },
        },
      );

      await Promise.all([
        addSenderIdToIncomeRequestsPromise,
        addReceiverEmailToOutcomeRequestsPromise,
      ]);

      return res.json({
        message: ` Request has been send to ${receiverEmail} succesfuly`,
      });
    }

    // Accept friendship
    if (senderIdToAccept) {
      const moveSenderIdToFriendListPromise = User.updateOne(
        {
          _id: userId,
          'friendsList.friendId': {$ne: senderIdToAccept},
        },
        {
          $pull: {
            incomeRequests: {
              userId: senderIdToAccept,
            },
          },
          $push: {
            friendsList: {friendId: senderIdToAccept},
          },
        },
      );

      const receiver = await User.findById(userId);
      const {email} = receiver;
      const moveReceiverIdToFriendListPromise = User.updateOne(
        {
          _id: senderIdToAccept,
          'friendsList.friendId': {$ne: userId},
        },
        {
          $pull: {
            outcomeRequests: {email},
          },
          $push: {
            friendsList: {friendId: userId},
          },
        },
      );
      await Promise.all([
        moveSenderIdToFriendListPromise,
        moveReceiverIdToFriendListPromise,
      ]);

      return res.json({
        message: `Friend ${senderIdToAccept} has been added succesfuly`,
      });
    }

    // Cencel friendship
    if (senderIdToCencel) {
      // remove sender's id from incomeRequests
      const removeSenderIdFromIncomeRequestsPromise = User.updateOne(
        {
          _id: userId,
          'friendsList.friendId': {$ne: senderIdToCencel},
        },
        {
          $pull: {
            incomeRequests: {
              userId: senderIdToCencel,
            },
          },
        },
      );

      // remove receiver's email from outcomeRequests
      const receiver = await User.findById(userId);
      const {email} = receiver;
      const removeReceiverEmailFromOutcomeRequestsPromise = User.updateOne(
        {
          _id: senderIdToCencel,
          'friendsList.friendId': {$ne: userId},
        },
        {
          $pull: {
            outcomeRequests: {email},
          },
        },
      );

      await Promise.all([
        removeSenderIdFromIncomeRequestsPromise,
        removeReceiverEmailFromOutcomeRequestsPromise,
      ]);

      return res.json({
        message: `Friend's request with id ${senderIdToCencel} has been deleted`,
      });
    }

    res.status(400).json({
      message:
        'Bad request, send any of this var: "receiverEmail", "senderIdToAccept", "senderIdToCencel"',
    });
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

module.exports = {
  getUsers,
  findUser,
};
