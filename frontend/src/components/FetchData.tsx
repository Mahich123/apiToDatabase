export default async function FetchData() {
    const res = await fetch("https://raw.githubusercontent.com/Bit-Code-Technologies/mockapi/main/purchase.json")
    
    if(!res.ok) {
        throw new Error("Error fetching data")
    }

    return res.json()
}