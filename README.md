# **BD2_2S2023_P3_G11**

## **Analisis De Resultados**
### **Modelo de Datos:**
- MongoDB permite esquemas flexibles y consultas complejas debido a su modelo de datos basado en documentos JSON. Esto facilita la optimizacion de las consultas para el acceso eficiente a los datos.
- DynamoDB utiliza un modelo de clave-valor con un enfoque mas rigido en la definicion de indices. Esto puede afectar la forma en que las consultas son diseñadas y ejecutadas.

### **Indices:**
- La configuración correcta de indices puede tener un impacto significativo en el rendimiento de las consultas. MongoDB permite una amplia variedad de indices, mientras que DynamoDB tiene indices globales y locales con restricciones especificas.

### **Complejidad de Consultas:**
- El rendimiento puede variar segun la complejidad de las consultas. MongoDB puede ser mas flexible en terminos de consultas complejas, mientras que DynamoDB puede ser mas eficiente para ciertos patrones de acceso predefinidos.

### **Libros**
Con el tema de los libros de las operaciones principales(CRUD) y las 10 consultas que se realizaron , la mayoria de estas fueron ejecutas atraves de endpoints utilizando el software Postman , la cual como se presenta a continuacion el resultado de las mismas mostrando asi el estado de la resupuesta asi como tambien la cantidad de milisegundos en que se tomo realizar la operacion, que para este caso en el tema de los libros la mayoria de endpoint estubo entre los 85 y 95 ms. Todo esto con base a lo descrito en la parte de analisis ya presentado anteriormente.


#### **Consulta1:**
![Alt text](imagenes/get_all_libros.png?raw=true "get_all_libros")

#### **Consulta4:**
![Alt text](imagenes/consulta4_libros.png?raw=true "consulta4_libros")

## Peliculas
Para el caso de las operaciones principales(CRUD) y las 10 consultas que se realizaron con relacion a las peliculas, la mayoria de estas fueron ejecutas atraves de endpoints utilizando el software Postman , la cual como se presenta a continuacion el resultado de las mismas mostrando asi el estado de la resupuesta asi como tambien la cantidad de milisegundos en que se tomo realizar la operacion, que para este caso la mayoria de endpoint estubo entre los 200 y 300 ms. Todo esto con base a lo descrito en la parte de analisis ya presentado anteriormente.

#### **Consulta1:**
![Alt text](imagenes/get_all_peliculas.png?raw=true "get_all_peliculas")

#### **Consulta5:**
![Alt text](imagenes/consulta5_peliculas.png?raw=true "consulta5_peliculas")


### Conclusion
- Independientemente de cual se elija ya sea MongoDB o DynamoDB dependera en gran medida de los requisitos especificos del proyecto que se tenga que realizar , la complejidad de las consultas que se piden, la flexibilidad del modelo de datos y consideraciones como el costo y la administración de la infraestructura en donde estaremos aljando nuestros datos. Ambas bases de datos son solidas en sus respectivos contextos, y la decision debe basarse en una evaluacion detallada de los factores clave para tu caso de uso en que se pueda presentar y asu usar la que mejor comvenga para un proyecto sin ningun inconveniente.