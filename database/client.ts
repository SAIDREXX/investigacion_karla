import { createClient } from "@libsql/client";

export const client = createClient({
    url: import.meta.env.TURSO_DATABASE_URL,
    authToken: import.meta.env.TURSO_AUTH_TOKEN,
});

interface User {
    name: string;
    email: string;
    enrollment: string;
    password: string;
}

interface User_Login {
    email: string;
    password: string;
}

export const addUser = async (jsonData: User) => {
    const sql = "INSERT INTO usuarios (nombre, correo_institucional, matricula, contraseña) VALUES (?, ?, ?, ?)";

    const result = await client.execute({
        sql: sql,
        args: [jsonData.name, jsonData.email, jsonData.enrollment, jsonData.password],
    })

    console.log(result)
    return result
}

export const getUser = async (jsonData: User_Login) => {
    const sql = "SELECT * FROM usuarios WHERE correo_institucional = ? AND contraseña = ?";
    const result = await client.execute({
        sql: sql,
        args: [jsonData.email, jsonData.password],
    });

    if (result.rows.length > 0) {
        return result.rows[0]; // Retorna el usuario si coincide
    } else {
        throw new Error("Credenciales incorrectas"); // Lanza un error si no hay coincidencia
    }
};

