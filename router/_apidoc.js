// ------------------------------------------------------------------------------------------
// General apiDoc documentation blocks and old history blocks.
// ------------------------------------------------------------------------------------------

// ------------------------------------------------------------------------------------------
// Current Permissions.
// ------------------------------------------------------------------------------------------
/**
 * @apiDefine admin Admin access rights needed.
 * A admin connected and with the right
 *
 */

 /**
  * @apiDefine connected user need to be connected to have permision
  * Need to be connected
  *
  * @apiHeaderExample {json} Header-Example:
  *     {
  *       "Content-Type": "application/json",
  *       "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6I"
  *     }
  */

// ------------------------------------------------------------------------------------------
// Current Errors.
// ------------------------------------------------------------------------------------------
/**
 * @apiDefine TokenMissingError
 * @apiError (401) TokenMissing Token not found in header
 *
 */

 /**
  * @apiDefine AuthenticateTokenFailed
  * @apiError (500) AuthenticateTokenFail Failed to authenticate token
  * @apiError (500) TokenExpired Token provided is expired
  */
