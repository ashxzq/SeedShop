const mongoose = require('mongoose');

module.exports = async function filter(req, object) {
    let where = {};
    let sort = {};
    let select = {};
    let skip = null;
    let limit = null;

    const queryParameters = req.query;
    if (queryParameters.where) {
        where = JSON.parse(queryParameters.where);

        // Auto-cast ObjectId
        for (const property in where)
            if (property instanceof String && mongoose.Types.ObjectId.isValid(property.toString()))
                queryParameters.where[property] = mongoose.Types.ObjectId(queryParameters.where[property].toString())
    }
    if (queryParameters.sort) sort = JSON.parse(queryParameters.sort);
    if (queryParameters.select) select = JSON.parse(queryParameters.select);
    if (queryParameters.skip) skip = parseInt(JSON.parse(queryParameters.skip));
    if (queryParameters.limit) limit = parseInt(JSON.parse(queryParameters.limit));

    let res;
    if (queryParameters.count && JSON.parse(queryParameters.count) === true) {
        res = await object.find(where).select(select).sort(sort).skip(skip).limit(limit).count();
    } else {
        res = await object.find(where).select(select).sort(sort).skip(skip).limit(limit);
    }
    return res;
}