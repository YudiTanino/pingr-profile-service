export async function getUser(axios, username){
    const user = await axios.get(`http://localhost:3000/users/${username}`)
    return JSON.parse(user.data)
}

export function updateUser(id){
    console.log()
}