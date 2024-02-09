// Other middleware functions...
export const json = function (context) {
    return JSON.stringify(context);
};

export const decimal = function (context) {
    return context.toLocaleString();
};
