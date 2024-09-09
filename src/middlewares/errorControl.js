// eslint-disable-next-line no-unused-vars
function errorControl(err, req, res, next) {
    // Log the error details
    console.error('Error:', err.message);
    console.error('Stack:', err.stack);
    console.error('Context:', {
        method: req.method,
        url: req.url,
        body: req.body,
        query: req.query,
        params: req.params,
    });

    // Handle different types of errors (optional)
    if (err instanceof TypeError) {
        console.error('Type Error occurred');
    } else if (err instanceof ReferenceError) {
        console.error('Reference Error occurred');
    } else {
        console.error('General Error occurred');
    }

    // Return a standardized error response
    res.status(500).json({
        status: 'error',
        message: err.message,
        context: {
            method: req.method,
            url: req.url,
            body: req.body,
            query: req.query,
            params: req.params,
        },
    });
}

export default errorControl;
