// Dummy notification function (can integrate with Firebase or OneSignal later)
const sendNotification = async (userId, message) => {
    console.log(`📢 Notification to User ${userId}: ${message}`);
    // Future: integrate push notification service here
};

module.exports = sendNotification;