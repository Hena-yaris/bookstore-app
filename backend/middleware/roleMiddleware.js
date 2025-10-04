const {StatusCodes} = require('http-status-codes');

const roleMiddleware =  (requiredRole)=> {

    return (req,res,next)=> {
        if(!req.user) {
            return res.status(StatusCodes.UNAUTHORIZED).json({msg:"user not authenticated!"});
        }

        if(req.user.role !== requiredRole){
            return res.status(StatusCodes.FORBIDDEN).json({msg:"Access denied: Admin only!"})
        }

        next();
    }
}

module.exports= roleMiddleware;