# How run it!

**Primero, clonar el repositorio:**

      git clone https://github.com/FlippahOrtega/Full-Stack-Dev.git && cd /Full-Stack-Dev

**Instalamos y ejecutamos el proyecto:** 

    npm i
    npm run dev 

## Advertencia
Si obtienes el siguiente mensaje de error

> error db: MongoError: Authentication failed.   
> ok: 0, 
>  code: 8000,  
> codeName: 'AtlasError'





Es porque debes crear un archivo .env con las siguiente estructura. 
   > Puedes usar la configuración con las credenciales en el ejemplo pero
   > estas no estarán habilitadas durante mucho tiempo, te recomiendo crear
   > una cuenta en https://cloud.mongodb.com/ y usar la capa gratuita para
   > crear un clúster y un usuario el cual les brindara las credenciales
   > para ingresar en este archivo .env

    USER=flipp 
    
    PASSWORD=Ndk3lg1xCfm7Fexr 
    
    DBNAME=api  <-- whaterver you want
    
    TOKEN_SECRET=pa88W03dt3u3 <-- whaterver you want, be carefull 


Detén el proyecto, inicia de nuevo y descarga el archivo que se encuentra en 

    ./Full-Stack-Dev/postman/Test.postman_collection

Importa el archivo en postman, contiene las solicitudes para probar el API REST.

   

>  **SignUp Request**

    URL :localhost:3001/api/user/register
    Method: POST
    Body request: {
        "name":"username",
        "email":"email@user.com",
        "password":  "**********"
        }
       
 

>    **LogIn Request**

    URL :localhost:3001/api/user/login
    Method: POST
    Body request: {
	    "email":"email@user.com",
	    "password": "******"
	    }
	
    

> **Create To Do Task Request**

    URL :localhost:3001/api/todo/create
    Method: POST
    headers: auth-token:"El valor de este token se obtiene en la solicitud de login"
    Body request: {
	    "title": "title of to do",
	    "description": "to do description"
	}
    

> **Get All To Do Task Request**

    URL :localhost:3001/api/todo/list
    Method: GET
    headers: auth-token:"El valor de este token se obtiene en la solicitud de login"

	

> **Update Task Request**

    URL :localhost:3001/api/todo/update
    Method: PUT
    headers: auth-token:"El valor de este token se obtiene en la solicitud de login"
    Body request: {
	    "id": "Se obtiene en la solicitud get, endpoint list",
	    "title": "Edicion  sesgunda vez",
	    "description": "new topic mas descripcion de pupdate tomorrow"
	}

	

> **Delete Task Request**

    URL :localhost:3001/api/todo/delete
    Method: DELETE
    Body request: {
	    "id":"Se obtiene en la solicitud get, endpoint list"
	}