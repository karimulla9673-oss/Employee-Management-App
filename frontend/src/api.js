const BASE_URL = 'http://localhost:8080';

export const GetAllEmployees = async (search = '', page = 1, limit = 5) => {
    const url =
        `${BASE_URL}/api/employees?search=${search}&page=${page}&limit=${limit}`;
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const result = await fetch(url, options);
        const { data } = await result.json();

        return data;
    } catch (err) {
        return err;
    }
}

export const GetEmployeeDetailsById = async (id) => {
    const url =
        `${BASE_URL}/api/employees/${id}`;
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const result = await fetch(url, options);
        const { data } = await result.json();
        console.log(data);
        return data;
    } catch (err) {
        return err;
    }
}

export const DeleteEmployeeById = async (id) => {
    const url =
        `${BASE_URL}/api/employees/${id}`;
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const result = await fetch(url, options);
        const data = await result.json();
        console.log(data);
        return data;
    } catch (err) {
        return err;
    }
}


export const CreateEmployee = async (employeeData) => {
    const formData = new FormData();
    formData.append('name', employeeData.name);
    formData.append('email', employeeData.email);
    formData.append('phone', employeeData.phone);
    formData.append('department', employeeData.department);
    formData.append('salary', employeeData.salary);
    
    if (employeeData.profileImage) {
        formData.append('profileImage', employeeData.profileImage);
    }

    try {
        const response = await fetch('http://localhost:8080/api/employees', {
            method: 'POST',
            body: formData // Don't set Content-Type header, browser will set it automatically
        });

        if (!response.ok) {
            const text = await response.text();
            console.error('Server error:', text);
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Create employee error:', error);
        throw error;
    }
};

export const UpdateEmployeeById = async (employeeData, id) => {
    const formData = new FormData();
    formData.append('name', employeeData.name);
    formData.append('email', employeeData.email);
    formData.append('phone', employeeData.phone);
    formData.append('department', employeeData.department);
    formData.append('salary', employeeData.salary);
    
    if (employeeData.profileImage instanceof File) {
        formData.append('profileImage', employeeData.profileImage);
    }

    try {
        const response = await fetch(`http://localhost:8080/api/employees/${id}`, {
            method: 'PUT',
            body: formData
        });

        if (!response.ok) {
            const text = await response.text();
            console.error('Server error:', text);
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Update employee error:', error);
        throw error;
    }
};