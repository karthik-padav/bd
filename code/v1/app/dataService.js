const location_list_url = "https://raw.githubusercontent.com/ka-nineteen-developer/location-list/master/location_list.json"

export const getPhoneNumber = (token) => {
    return new Promise((resolve, reject) => {
        fetch('https://graph.accountkit.com/v1.3/me/?access_token='+token, {})
        .then((response) => response.json())
        .then((responseJson) => {
            if(responseJson !== null){
                resolve(responseJson);
            } else {
                data = {
                    Status: 'Error'
                }
                resolve(data)
            }
        }).catch(err => {
            data = {
                Status: 'Error'
            }
            resolve(data);
        })
    })
}

export const getLocationList = () => {
    return new Promise((resolve, reject) => {
        fetch(location_list_url, {})
        .then((response) => response.json())
        .then((responseJson) => {
            if(responseJson !== null){
                resolve(responseJson);
            } else {
                data = {
                    Status: 'Error'
                }
                resolve(data)
            }
        }).catch(err => {
            data = {
                Status: 'Error'
            }
            resolve(data);
        })
    })
}

export const getAllUser = (db) => {
    return new Promise((resolve, reject) => {
        
        // Store to firebase
        db.collection("users").get()
        .then(function(docRef) {
            let dbUserInfo = docRef.docs.map(doc => doc.data());
            resolve(dbUserInfo)
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
            resolve(error);
        });

    })
}