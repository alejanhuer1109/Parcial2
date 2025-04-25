//Jalo la libreria express
const express = require('express');
//jalo la conexion a la base de datos
const connection = require('./db');


//aqui vamos a poder usar express por medio de esta variable app
const app = express();


//Encargado de parsear todo alos json
app.use(express.json());

//Para que me lea las direcciones URL
app.use(express.urlencoded({extended:true}));

app.get('/api/prueba', (req, res)=>{
    res.send('estoy respondiendo por la api')
});

app.get('/api/prueba2',(req, res)=>{
    res.status(200).json({
        message:'api funciona bien',
        port:PORT,
        status:'exitoso'

    });

});
//Crear puerto de conexion del servidor
const PORT = 3000;

//La conexion la va a escuchar por el puerto 3000 y si 
app.listen(PORT, ()=>{
    console.log('El servidor esta corriendo');

});

//CRUD RESTAURANTE

//MÉTODO POST

app.post('/api/guardar', (req, res) => {
    const { id_rest, nombre, ciudad, direccion, fecha_apertura } = req.body;
    const query = 'INSERT INTO Restaurante (id_rest, nombre, ciudad, direccion, fecha_apertura) VALUES ($1, $2, $3, $4, $5)';

    connection.query(query, [id_rest, nombre, ciudad, direccion, fecha_apertura], (error, result) => {
        if (error) {
            res.status(500).json({
                message: 'ERROR CREANDO EL RESTAURANTE',
                error
            });
        } else {
            res.status(201).json({ id_rest, nombre, ciudad, direccion, fecha_apertura });
        }
    });
});


//MÉTODO GET

app.get('/api/obtener', (req, res) => {
    const query = 'SELECT * FROM Restaurante';

    connection.query(query, (error, result) => {
        if (error) {
            res.status(500).json({
                success: false,
                message: "Error al recuperar los datos de el restaurante",
                details: error.message
            });
        } else {
            res.status(200).json({
                success: true,
                message: "Datos de el restaurante",
                details: result
            });
        }
    });
});

//MÉTODO PUT

app.put('/api/actualizar/:id_rest', (req, res) => {  
    const { id_rest } = req.params; 
    const { nombre, ciudad, direccion, fecha_apertura } = req.body;  

    const query = 'UPDATE Restaurante SET nombre = $1, ciudad = $2, direccion = $3, fecha_apertura = $4 WHERE id_rest = $5';  

    connection.query(query, [nombre, ciudad, direccion, fecha_apertura, id_rest], (error, result) => {  
        if (error) {  
            res.status(500).json({  
                success: false,  
                message: 'Error al actualizar el restaurante',  
                details: error.message  
            });  
        } else if (result.rowCount === 0) {  
            res.status(404).json({  
                success: false,  
                message: `No se encontró ningún restaurante con el id ${id_rest}`  
            });  
        } else {  
            res.status(200).json({  
                success: true,  
                message: 'Restaurante actualizado correctamente',  
                updated: {  
                    id_rest,  
                    nombre,  
                    ciudad,  
                    direccion,  
                    fecha_apertura  
                }  
            });  
        }  
    });  
});  

//MÉTODO DELETE

app.delete('/api/eliminar/:id_rest', (req, res) => {
    const { id_rest } = req.params;
    const query = 'DELETE FROM Restaurante WHERE id_rest = $1';

    connection.query(query, [id_rest], (error, result) => {

        if (error) {
            res.status(500).json({
                success: false,
                message: "Error al eliminar el restaurante",
                details: error.message
            });
        } else if (result.rowCount === 0) {
            res.status(404).json({
                success: false,
                message: `No existe el restaurante ${id_rest}`,
                
            });
        } else {
            res.status(200).json({
                success: true,
                message: "Restaurante eliminado de la tabla",
                details: result
                
            });
        }
    });
});


//CRUD EMPLEADO

//MÉTODO POST

app.post('/api/guardar_empleado', (req, res) => {
    const { id_empleado, nombre, rol, id_rest } = req.body;
    const query = 'INSERT INTO Empleado (id_empleado, nombre, rol, id_rest) VALUES ($1, $2, $3, $4)';

    connection.query(query, [id_empleado, nombre, rol, id_rest], (error, result) => {
        if (error) {
            res.status(500).json({
                message: 'ERROR CREANDO EL EMPLEADO',
                error
            });
        } else {
            res.status(201).json({ id_empleado, nombre, rol, id_rest });
        }
    });
});



//MÉTODO GET

app.get('/api/obtener_empleado', (req, res) => {
    const query = 'SELECT * FROM Empleado';

    connection.query(query, (error, result) => {
        if (error) {
            res.status(500).json({
                success: false,
                message: "Error al recuperar los datos del empleado",
                details: error.message
            });
        } else {
            res.status(200).json({
                success: true,
                message: "Datos de el empleado",
                details: result
            });
        }
    });
});

//MÉTODO PUT

app.put('/api/actualizar_empleado/:id_empleado', (req, res) => {
    const { id_empleado } = req.params;
    const { nombre, rol, id_rest } = req.body;

    const query = 'UPDATE Empleado SET nombre = $1, rol = $2, id_rest = $3 WHERE id_empleado = $4';

    connection.query(query, [nombre, rol, id_rest, id_empleado], (error, result) => {
        if (error) {
            res.status(500).json({
                success: false,
                message: 'Error al actualizar el empleado',
                details: error.message
            });
        } else if (result.rowCount === 0) {
            res.status(404).json({
                success: false,
                message: `No se encontró ningún empleado con el id ${id_empleado}`
            });
        } else {
            res.status(200).json({
                success: true,
                message: 'Empleado actualizado correctamente',
                updated: {
                    id_empleado,
                    nombre,
                    rol,
                    id_rest
                }
            });
        }
    });
});



//MÉTODO DELETE

app.delete('/api/eliminar_empleado/:id_empleado', (req, res) => {
    const { id_empleado } = req.params;
    const query = 'DELETE FROM Empleado WHERE id_empleado = $1';

    connection.query(query, [id_empleado], (error, result) => {

        if (error) {
            res.status(500).json({
                success: false,
                message: "Error al eliminar el empleado",
                details: error.message
            });
        } else if (result.rowCount === 0) {
            res.status(404).json({
                success: false,
                message: `No existe el empleado ${id_empleado}`,
                
            });
        } else {
            res.status(200).json({
                success: true,
                message: "Empleado eliminado de la tabla",
                details: result
                
            });
        }
    });
});

//CRUD PRODUCTO

//MÉTODO POST

app.post('/api/guardar_producto', (req, res) => {
    const { id_prod, nombre, precio } = req.body;
    const query = 'INSERT INTO Producto (id_prod, nombre, precio) VALUES ($1, $2, $3)';

    connection.query(query, [id_prod, nombre, precio], (error, result) => {
        if (error) {
            res.status(500).json({
                message: 'ERROR CREANDO EL PRODUCTO',
                error
            });
        } else {
            res.status(201).json({ id_prod, nombre, precio });
        }
    });
});



//MÉTODO GET

app.get('/api/obtener_producto', (req, res) => {
    const query = 'SELECT * FROM Producto';

    connection.query(query, (error, result) => {
        if (error) {
            res.status(500).json({
                success: false,
                message: "Error al recuperar los datos de el producto",
                details: error.message
            });
        } else {
            res.status(200).json({
                success: true,
                message: "Datos de el producto",
                details: result
            });
        }
    });
});

//MÉTODO PUT

app.put('/api/actualizar_producto/:id_prod', (req, res) => {
    const { id_prod } = req.params;
    const { nombre, precio } = req.body;

    const query = 'UPDATE Producto SET nombre = $1, precio = $2 WHERE id_prod = $3';

    connection.query(query, [nombre, precio, id_prod], (error, result) => {
        if (error) {
            res.status(500).json({
                success: false,
                message: 'Error al actualizar el producto',
                details: error.message
            });
        } else if (result.rowCount === 0) {
            res.status(404).json({
                success: false,
                message: `No se encontró ningún producto con el id ${id_prod}`
            });
        } else {
            res.status(200).json({
                success: true,
                message: 'Producto actualizado correctamente',
                updated: {
                    id_prod,
                    nombre,
                    precio
                }
            });
        }
    });
});



//MÉTODO DELETE

app.delete('/api/eliminar_producto/:id_prod', (req, res) => {
    const { id_prod} = req.params;
    const query = 'DELETE FROM Producto WHERE id_prod = $1';

    connection.query(query, [id_prod], (error, result) => {

        if (error) {
            res.status(500).json({
                success: false,
                message: "Error al eliminar el producto",
                details: error.message
            });
        } else if (result.rowCount === 0) {
            res.status(404).json({
                success: false,
                message: `No existe el producto ${id_prod}`,
                
            });
        } else {
            res.status(200).json({
                success: true,
                message: "Producto eliminado de la tabla",
                details: result
                
            });
        }
    });
});

//CRUD PEDIDO

//MÉTODO POST

app.post('/api/guardar_pedido', (req, res) => {
    const { id_pedido, fecha, id_rest, total } = req.body;
    const query = 'INSERT INTO Pedido (id_pedido, fecha, id_rest, total) VALUES ($1, $2, $3, $4)';

    connection.query(query, [id_pedido, fecha, id_rest, total], (error, result) => {
        if (error) {
            res.status(500).json({
                message: 'ERROR CREANDO EL PEDIDO',
                error
            });
        } else {
            res.status(201).json({ id_pedido, fecha, id_rest, total });
        }
    });
});



//MÉTODO GET

app.get('/api/obtener_pedido', (req, res) => {
    const query = 'SELECT * FROM Pedido';

    connection.query(query, (error, result) => {
        if (error) {
            res.status(500).json({
                success: false,
                message: "Error al recuperar los datos de el pedido",
                details: error.message
            });
        } else {
            res.status(200).json({
                success: true,
                message: "Datos de el pedido",
                details: result
            });
        }
    });
});

//MÉTODO PUT
app.put('/api/actualizar_pedido/:id_pedido', (req, res) => {
    const { id_pedido } = req.params;
    const { fecha, id_rest, total } = req.body;

    const query = 'UPDATE Pedido SET fecha = $1, id_rest = $2, total = $3 WHERE id_pedido = $4';

    connection.query(query, [fecha, id_rest, total, id_pedido], (error, result) => {
        if (error) {
            res.status(500).json({
                success: false,
                message: 'Error al actualizar el pedido',
                details: error.message
            });
        } else if (result.rowCount === 0) {
            res.status(404).json({
                success: false,
                message: `No se encontró ningún pedido con el id ${id_pedido}`
            });
        } else {
            res.status(200).json({
                success: true,
                message: 'Pedido actualizado correctamente',
                updated: {
                    id_pedido,
                    fecha,
                    id_rest,
                    total
                }
            });
        }
    });
});


//MÉTODO DELETE

app.delete('/api/eliminar_pedido/:id_pedido', (req, res) => {
    const { id_pedido} = req.params;
    const query = 'DELETE FROM Pedido WHERE id_pedido = $1';

    connection.query(query, [id_pedido], (error, result) => {

        if (error) {
            res.status(500).json({
                success: false,
                message: "Error al eliminar el pedido",
                details: error.message
            });
        } else if (result.rowCount === 0) {
            res.status(404).json({
                success: false,
                message: `No existe el pedido ${id_pedido}`,
                
            });
        } else {
            res.status(200).json({
                success: true,
                message: "Pedido eliminado de la tabla",
                details: result
                
            });
        }
    });
});

//CRUD DETALLE PEDIDO

//MÉTODO POST

app.post('/api/guardar_DetallePedido', (req, res) => {
    const { id_detalle, id_pedido, id_prod, cantidad, subtotal } = req.body;
    const query = 'INSERT INTO DetallePedido (id_detalle, id_pedido, id_prod, cantidad, subtotal) VALUES ($1, $2, $3, $4, $5)';

    connection.query(query, [id_detalle, id_pedido, id_prod, cantidad, subtotal], (error, result) => {
        if (error) {
            res.status(500).json({
                message: 'ERROR CREANDO EL DETALLE DEL PEDIDO',
                error
            });
        } else {
            res.status(201).json({
                success: true,
                message: 'Detalle del pedido creado correctamente',
                created: { id_detalle, id_pedido, id_prod, cantidad, subtotal }
            });
        }
    });
});



//MÉTODO GET

app.get('/api/obtener_DetallePedido', (req, res) => {
    const query = 'SELECT * FROM DetallePedido';

    connection.query(query, (error, result) => {
        if (error) {
            res.status(500).json({
                success: false,
                message: "Error al recuperar los datos de el detella del pedido",
                details: error.message
            });
        } else {
            res.status(200).json({
                success: true,
                message: "Detalles de el pedido",
                details: result
            });
        }
    });
});

//MÉTODO PUT
app.put('/api/actualizar_DetallePedido/:id_detalle', (req, res) => {
    const { id_detalle } = req.params;
    const { id_pedido, id_prod, cantidad, subtotal} = req.body;

    const query = 'UPDATE DetallePedido SET id_pedido = $1, id_prod = $2, cantidad = $3, subtotal = $4 WHERE id_detalle = $5';

    connection.query(query, [id_pedido, id_prod, cantidad, subtotal, id_detalle], (error, result) => {
        if (error) {
            res.status(500).json({
                success: false,
                message: 'Error al actualizar el detalle del pedido',
                details: error.message
            });
        } else if (result.rowCount === 0) {
            res.status(404).json({
                success: false,
                message: `No se encontró ningún detalle de pedido con el id ${id_detalle}`
            });
        } else {
            res.status(200).json({
                success: true,
                message: 'Detalle de pedido actualizado correctamente',
                updated: {
                    id_detalle,
                    id_pedido,
                    id_prod,
                    cantidad,
                    subtotal
                }
            });
        }
    });
});



//MÉTODO DELETE

app.delete('/api/eliminar_DetallePedido/:id_detalle', (req, res) => {
    const { id_detalle} = req.params;
    const query = 'DELETE FROM DetallePedido WHERE id_detalle = $1';

    connection.query(query, [id_detalle], (error, result) => {

        if (error) {
            res.status(500).json({
                success: false,
                message: "Error al eliminar el detalle del pedido",
                details: error.message
            });
        } else if (result.rowCount === 0) {
            res.status(404).json({
                success: false,
                message: `No existe el detalle del pedido ${id_detalle}`,
                
            });
        } else {
            res.status(200).json({
                success: true,
                message: "Detalle del pedido eliminado de la tabla",
                details: result
                
            });
        }
    });
});

//CONSULTAS NATIVAS

// 1. Obtener todos los productos de un pedido específico
app.get('/api/productos_pedido/:id_pedido', (req, res) => {
    const { id_pedido } = req.params;
    const query = `
        SELECT P.id_prod, P.nombre, P.precio, DP.cantidad, DP.subtotal
        FROM DetallePedido DP
        JOIN Producto P ON DP.id_prod = P.id_prod
        WHERE DP.id_pedido = $1
    `;

    connection.query(query, [id_pedido], (error, result) => {
        if (error) {
            res.status(500).json({
                success: false,
                message: "Error al obtener los productos del pedido",
                details: error.message
            });
        } else {
            res.status(200).json({
                success: true,
                message: "Productos del pedido obtenidos correctamente",
                productos: result.rows
            });
        }
    });
});

//2. Obtener los productos más vendidos (más de X unidades) 

app.get('/api/productos_mas_vendidos', (req, res) => {
    const query = `
        SELECT P.id_prod, P.nombre, SUM(DP.cantidad) AS total_vendidos
        FROM DetallePedido DP
        JOIN Producto P ON DP.id_prod = P.id_prod
        GROUP BY P.id_prod, P.nombre
        ORDER BY total_vendidos DESC
        LIMIT 10
    `;

    connection.query(query, (error, result) => {
        if (error) {
            res.status(500).json({
                success: false,
                message: "Error al obtener los productos más vendidos",
                details: error.message
            });
        } else {
            res.status(200).json({
                success: true,
                message: "Productos más vendidos obtenidos correctamente",
                productos: result.rows
            });
        }
    });
});

//3. Obtener el total de ventas por restaurante 

app.get('/api/total_ventas_por_restaurante', (req, res) => {
    const query = `
        SELECT r.id_rest, r.nombre, SUM(p.total) AS total_ventas
        FROM Restaurante r
        JOIN Pedido p ON r.id_rest = p.id_rest
        GROUP BY r.id_rest, r.nombre
    `;

    connection.query(query, (error, result) => {
        if (error) {
            res.status(500).json({ message: "Error al obtener el total de ventas", error });
        } else {
            res.status(200).json(result.rows);
        }
    });
});

//4. Obtener los pedidos realizados en una fecha específica 

app.get('/api/pedidos_por_fecha', (req, res) => {
    const { fecha } = req.query;
    const query = `SELECT * FROM Pedido WHERE fecha = $1`;

    connection.query(query, [fecha], (error, result) => {
        if (error) {
            res.status(500).json({ message: "Error al obtener pedidos por fecha", error });
        } else {
            res.status(200).json(result.rows);
        }
    });
});

//5. Obtener los empleados por rol en un restaurante

app.get('/api/empleados_por_rol', (req, res) => {
    const { rol, id_rest } = req.query;
    const query = `SELECT * FROM Empleado WHERE rol = $1 AND id_rest = $2`;

    connection.query(query, [rol, id_rest], (error, result) => {
        if (error) {
            res.status(500).json({ message: "Error al obtener empleados por rol", error });
        } else {
            res.status(200).json(result.rows);
        }
    });
});
