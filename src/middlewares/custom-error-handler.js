/**
 * https://expressjs.com/en/guide/error-handling.html
 * This function overrides default Express error handler.
 */
export default function (err, req, res, next) {
	// If headers were already sent to client, delegate to the default Express error handler
	if (res.headersSent) {
		return next(err);
	}

	let { status, errorCode = 'UNKNOWN_ERROR', message = 'Unknown error', payload } = err;

	// If the status code is outside the 4xx or 5xx range, set it to 500
	if (!Number.isInteger(status) || status < 400 || status > 599) {
		status = 500;
	}

	console.error(`🔴 ERROR with status ${status}: ${errorCode} ${message}`);
	if (status === 500) {
		console.error(err.stack);
	}

	res.status(status).json({ status, errorCode, message, payload });
}