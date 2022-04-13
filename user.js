const axios = require('axios');
const baseURL = process.env.API_HOST;

const endpoints = (
    registeredUsers = '/registeredusers',
    unregisteredUsers = '/unregisteredusers',
    projectMemberships = '/projectmemberships'
);

const getAllUsers = async ctx => {

    let allUsers = await Promise.all([fetch(baseURL + registeredUsers), 
                                      fetch(baseURL + unregisteredUsers), 
                                      fetch(baseURL + projectMemberships)]).then(res => {

        if (!res[0] || !res[1] || !res[2]) {
            return undefined;
        }

        let userToProjectsMap = {};
        res[2].forEach(pair => {
            if (userToProjectsMap[pair.userId]) {
                userToProjectsMap[pair.userId].push(pair.projectId);
            } else {
                userToProjectsMap[pair.userId] = [ pair.projectId ];
            }
        });

        let users = res[0].concat(res[1]);
        users.forEach(user => {
                // use set to deduplicate projectIds array
            user.projectIds = [ ...new Set(userToProjectsMap[user.id]) ] || [];
        });

        return users;

    }).catch(err => {
        console.log('Error: ', err.message)
    })

    if (allUsers) {
        ctx.response.status = 200;
        ctx.body = allUsers;
    } else {
        ctx.response.status = 500;
    }
}

function fetch(url) {
    return axios.get(url, {timeout: process.env.TIMEOUT})
                .then(res =>  res.data)
                .catch(err => console.log(`[Error fetching data from ${url}]: ${err.message}`));
}

module.exports = { getAllUsers, fetch, endpoints };
