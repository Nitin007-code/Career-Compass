/*
 Service Layer :-
  Services contain application/business logic.
 
  Keeping this logic outside controllers makes it easier to reuse and test later.
 */

const getServerStatus = () => { // it will Return the server status and environment information.
  return {
    status: "healthy",
    environment: process.env.NODE_ENV || "development",
  };
};

module.exports = {
  getServerStatus,
};