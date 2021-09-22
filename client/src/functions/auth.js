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

export const currentUser = async (authToken) => {
    return await axios.post(
        `${process.env.REACT_APP_API}/current-user`,
        {},
        {
            headers:{
                authorization: authToken
            }
        }
    );
};
export const createUser = async (email, password) => {
    return await axios.post(
        `${process.env.REACT_APP_API}/create-user`,
        {email, password},
    )
}

export const currentAdmin = async (authToken) => {
    return await axios.post(
        `${process.env.REACT_APP_API}/current-admin`,
        {},
        {
            headers:{
                authorization: authToken
            },
        }
    ).then((res) =>{
        console.log(res)
    });
};

export const login = async (email, password) => {
    return await axios.post(`${process.env.REACT_APP_API}/login`, {email, password})
}

export const getCurrentUser = async (authToken) => {
    return await axios.post(`${process.env.REACT_APP_API}/jwt-user`,
        {}, {
        headers:{
            authorization: authToken
            }
    })
}

export const updatePassword = async (authToken, password) =>{
    return await axios.post(`${process.env.REACT_APP_API}/update-password`,
        {password}, {
            headers:{
                authorization: authToken
            }
        })
}
