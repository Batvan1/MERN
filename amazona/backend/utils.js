import jwt from 'jsonwebtoken'

export const generateToken = (user)=>{
    return jwt.sign(
        {
            _id: user._id,
            name: user.name,
            email: user.email, // Burada token 'lanacak veriler belirtiyoruz
            isAdmin: user.isAdmin
        },
    
    process.env.JWT_SECRET, 

        {
        expiresIn: '30d'
        }
    )
}


export const isAuth = (req,res,next)=>{
    const authorization = req.headers.authorization
    
    if(authorization){
        const token = authorization.slice(7, authorization.length) // Bearer XXXXXXX
            
        jwt.verify(token, process.env.JWT_SECRET, (err, decodee)=>{ //Burada o verileri görünen modül sayesinde tokenden çıkartıyoruz

            if(err){
                res.status(401).send({message: 'Invalid Token'})
            }else{
            
                req.user = decodee
                next()
            }

        })

    }else{
        res.status(401).send({message: 'No Tokendsfsd'})
    }
}




