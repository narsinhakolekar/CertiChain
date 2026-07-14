import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import University from "../models/University.js";


export async function register(req, res) {

    try {

        const {
            name,
            email,
            password,
            wallet
        } = req.body;


        console.log("===== REGISTER REQUEST =====");
        console.log(req.body);


        const existing =
            await University.findOne({
                email
            });


        if (existing) {

            return res.status(400).json({
                message:"University already registered"
            });

        }


        const hashedPassword =
            await bcrypt.hash(
                password,
                10
            );


        const university =
            await University.create({

                name,

                email,

                password: hashedPassword,

                wallet

            });


        console.log("===== REGISTER SUCCESS =====");
        console.log(university);


        res.json({

            message:
            "University registered successfully"

        });


    }
    catch(error){

        console.error(error);


        res.status(500).json({

            error:error.message

        });

    }

}





export async function login(req,res){

    try {


        const {
            email,
            password
        } = req.body;



        console.log("===== LOGIN REQUEST =====");
        console.log(req.body);



        const university =
            await University.findOne({
                email
            });



        if(!university){

            return res.status(404).json({

                message:
                "University not found"

            });

        }



        const validPassword =
            await bcrypt.compare(

                password,

                university.password

            );



        if(!validPassword){

            return res.status(401).json({

                message:
                "Invalid password"

            });

        }




        const token =
            jwt.sign(

                {
                    id: university._id,

                    email: university.email,

                    wallet: university.wallet
                },


                process.env.JWT_SECRET,


                {
                    expiresIn:"1d"
                }

            );



        res.json({

            token,


            university:{

                name:
                university.name,


                email:
                university.email,


                wallet:
                university.wallet

            }

        });



    }
    catch(error){


        console.error(error);


        res.status(500).json({

            error:error.message

        });


    }

}