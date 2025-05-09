//generate unique values from a table of data 
export const generateUniqueValues  = (data, columnId) => {
    const columnValues = data.map(row => row[columnId])
    return ([... new Set(columnValues)])
}