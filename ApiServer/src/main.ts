import "reflect-metadata"; 
import app from "./app";  
import "dotenv/config";

const PORT = process.env.PORT || 5000; 

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

