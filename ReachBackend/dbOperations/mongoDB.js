
const mongoFindOne = async (collection, filter = {}, projection = {}, options = {}) => {
    const findOneResponse = await collection.findOne(filter, projection, options).exec();
    return findOneResponse;
}

const mongoFindMultiple = async (collection, filter = {}, projection = {}, options = {}) => {
    const findManyResponse = await collection.find(filter, projection, options).exec();
    return findManyResponse;
}

const mongoInsertOne = async (Collection, docObj = {}) => {
    const document = new Collection(docObj);
    const newDocument = await document.save();
    return newDocument === document;
}

const mongoInsertMultiple = (Collection, docs = []) => {
    Collection.insertMany(docs, (err, insertedDocs) => {
        if(err) {
            return err;
        } else {
            return insertedDocs;
        }
    })
}

const mongoUpdateOne = async (Collection, filter = {}, update = {}, options = {}) => {
    const updateResponse = await Collection.updateOne(filter, update, options);
    return updateResponse;
}

const mongoUpdateMultiple = (Collection, filter = {}, update = {}, options = {}) => {
    Collection.updateMany(filter, update, options, (err, updatedDocs) => {
        if(err) {
            return err;
        } else {
            return updatedDocs;
        }
    })
}

module.exports = {
    mongoFindOne,
    mongoFindMultiple,
    mongoInsertOne,
    mongoInsertMultiple,
    mongoUpdateOne,
    mongoUpdateMultiple,
}