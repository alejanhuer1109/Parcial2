// Importamos el cliente de PostgreSQL

const { Pool } = require('pg');

// Configuración de la conexión a Supabase
const pool = new Pool({
  host: 'aws-0-us-east-1.pooler.supabase.com',
  port: 5432,
  user: 'postgres.iuioactaqycnvxnamgmi',
  password: 'Pa716050.',
  database: 'postgres',
  ssl: { rejectUnauthorized: false } // Supabase requiere SSL
});

// Probar la conexión
pool.connect((err, client, release) => {
  if (err) {
    console.error('Error conectando con la base de datos', err.stack);
  } else {
    console.log('Conectado a la base de datos');
    release(); // Libera el cliente después de usarlo
  }
});


module.exports=pool;

