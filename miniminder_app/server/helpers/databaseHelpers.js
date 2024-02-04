// reusable functions 

async function getAdminData(model, view) {
    try {
        const data = await model.find({});
        console.log(data);
        return { dataList: data };
    } catch (error) {
        throw new Error(`Internal Server Error - ${view}`);
    }
}

async function updateData(model, id, newData) {
    try {
        await model.findByIdAndUpdate(id, newData, { new: true });
    } catch (error) {
        throw new Error('Internal Server Error - Unable to update record');
    }
}

async function deleteData(model, dataId) {
    try {
        const deletedData = await model.findByIdAndDelete(dataId);

        if (!deletedData) {
            throw new Error('Data not found');
        }
    } catch (error) {
        throw new Error('Internal Server Error - Deletion Incomplete');
    }
}

module.exports = { getAdminData, updateData, deleteData };
