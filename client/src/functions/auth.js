import axios from "axios";

export const createOrUpdateUser = async (authtoken) => {
    return await axios.post(
        `${process.env.REACT_APP_API}/create-or-update-user`,
        {},
        {
            headers: {
                authtoken,
            },
        }
    );
};

export const currentUser = async (authtoken) => {
    return await axios.post(
        `${process.env.REACT_APP_API}/current-user`,
        {},
        {
            headers: {
                authtoken,
            },
        }
    );
};
export const createUser = async (email, password) => {
    return await axios.post(
        `${process.env.REACT_APP_API}/create-user`,
        {email, password},
    )
}

export const currentAdmin = async (authtoken) => {
    return await axios.post(
        `${process.env.REACT_APP_API}/current-admin`,
        {},
        {
            headers: {
                authtoken,
            },
        }
    );
};

export const login = async (email, password) => {
    return await axios.post(`${process.env.REACT_APP_API}/login`, {email, password})
}

export const getCurrentUser = async (authToken) => {
    return await axios.post(`${process.env.REACT_APP_API}/jwt-user`,
        {}, {headers:{
            authorization: authToken
            }})
    //     .then((res) =>{
    //     console.log(res)
    // })
}