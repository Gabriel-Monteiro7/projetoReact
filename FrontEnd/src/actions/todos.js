
export function addUser(values){
    return {
        type:'ADD_USER',
        values,
    }
};
export function deleteUser(values){
    return {
        type:'DELETE_USER',
        values,
    }
};
export function selectAll(values){
    return {
        type:'SELECT_ALL',
        values
    }
};
export function selectUser(values){
    return {
        type:'SELECT_USER',
        values

    }
};
export function indexUser(values){
    return {
        type:'INDEX_USER',
        values

    }
};

