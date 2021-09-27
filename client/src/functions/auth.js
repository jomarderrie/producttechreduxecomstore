import axios from "axios";

export const createOrUpdateUser = async (authToken) => {
    return await axios.post(
        `http://localhost:8000/api/create-or-update-user`,
        {},
        {
            headers: {
                authorization: authToken,
            }
        }
    );
};

export const currentUser = async (authToken) => {
    return await axios.post(
        `http://localhost:8000/api/current-user`,
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
        `http://localhost:8000/api/create-user`,
        {email, password},
    )
}

export const currentAdmin = async (authToken) => {
    return await axios.post(
        `http://localhost:8000/api/current-admin`,
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
    return await axios.post(`http://localhost:8000/api/login`, {email, password})
}

export const getCurrentUser = async (authToken) => {
    return await axios.post(`http://localhost:8000/api/jwt-user`,
        {}, {
        headers:{
            authorization: authToken
            }
    })
}

export const updatePassword = async (authToken, password) =>{
    return await axios.post(`http://localhost:8000/api/update-password`,
        {password}, {
            headers:{
                authorization: authToken
            }
        })
}
