
const successResponse=(code,data)=>{
    return {
        status:"ok",
        statusCode:code,
        result:data
    }
}

const errorResponse=(code,data)=>{
    return {
        status:"error",
        statusCode:code,
        result:data
    }
}

export {successResponse,errorResponse};