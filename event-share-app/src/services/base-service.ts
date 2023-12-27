
const baseURL = 'http://localhost:3002';
export const search = async<T>(path: string, params: any): Promise<T[]> => {
    const query: URLSearchParams = new URLSearchParams(params);
    const response = await fetch(baseURL+path+query,{
        method: 'GET'
    });
    const data: T[] = await response.json();
    return data;
}

export const update = async<T>(path: string, id: string, data: T): Promise<T> => {
    const response = await fetch(`${baseURL}${path}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    const updatedData: T = await response.json();
    return updatedData;
}


// Function to delete data
export const remove = async<T>(path: string, id: string): Promise<void> => {
    await fetch(`${baseURL}${path}/${id}`, {
        method: 'DELETE',
    });
}

export const create = async<T>(path: string, data: T): Promise<T> => {
    const response = await fetch(`${baseURL}${path}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    const createdData: T = await response.json();
    return createdData;
}



