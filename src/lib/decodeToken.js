const decodeToken = () => {
    try {
        const token = localStorage.getItem("token");
        const payload = token.split(".")[1];
        const decoded = atob(payload);
        return JSON.parse(decoded);
    } catch (error) {
        console.error("Erro ao decodificar o token:", error);
        return null;
    }
};

export default decodeToken;