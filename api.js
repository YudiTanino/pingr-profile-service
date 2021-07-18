export async function getUser(axios, id){
    const user = await axios.get(`http://localhost:3000/users/${id}`)
    return JSON.parse(user.data)
}

export function updateUser(id){
    console.log()
}