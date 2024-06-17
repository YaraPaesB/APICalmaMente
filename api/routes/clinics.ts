import express, { Request, Response, request } from 'express';
import { Clinic } from '../models/clinics';
import { authorize } from '../middleware/auth';
import mongoose from 'mongoose';

export const clinicRoutes = express.Router()



clinicRoutes.post('/', authorize, async (req:Request, res:Response) => {
    try {
        const clinicParams = req.body
        
        const clinicAlreadyExists = await Clinic.findOne({email: clinicParams.email})

        if (clinicAlreadyExists) {
            res.status(400).json({
                message: "Clinic Already Exists"
            })
        }

        const clinic = await Clinic.create(clinicParams)

        res.status(200).json({
            message: "Clinic created",
            data: clinic
        })

        return
    } catch (error:any) {
        console.log(error);
        
        res.status(400).json({
            message: "Can't create this Clinic",
            errors: error.errors ?? undefined
        })
    }
})

clinicRoutes.get('/', authorize,  async (req:Request, res:Response) => {
    try {
        const allClinics = await Clinic.find({});
        console.log('oi');
        
        res.status(200).json(allClinics)
    } catch (error) {
        console.log(error);
        
        res.status(404).json({
            message: "Can't find"
        })
    }
})

clinicRoutes.get('/:id', authorize, async (req: Request, res: Response) => {
    try {
        const clinicId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(clinicId)) {
            return res.status(400).json({ message: "Invalid clinic ID format" });
        }

        const clinic = await Clinic.findById(clinicId);

        if (!clinic) {
            return res.status(404).json({
                message: "Clinic not found"
            });
        }

        res.status(200).json(clinic);
    } catch (error) {
        console.error('Error occurred while retrieving the clinic:', error);
        res.status(500).json({
            message: "An error occurred while retrieving the clinic"
        });
    }
});

clinicRoutes.get('/:name/filtro', authorize, async (req: Request, res: Response) => {
    try {
        const clinicName = req.params.filtro;


        const clinic = await Clinic.findOne({name: clinicName});
        console.log(clinic);
        
        if (!clinic) {
            return res.status(404).json({
                message: "Clinic not found"
            });
        }

        res.status(200).json(clinic);
    } catch (error) {
        console.error('Error occurred while retrieving the clinic:', error);
        res.status(500).json({
            message: "An error occurred while retrieving the clinic"
        });
    }
});

clinicRoutes.put('/:id', authorize, async (req:Request, res:Response) => {
    try {
        const clinicId = req.params.id;

        const clinicParams = req.body;
        const updatedClinic = await Clinic.findByIdAndUpdate(clinicId, clinicParams);

        if (!updatedClinic) {
            res.status(404).json({
                message: "Clinic not found"
            })
        }

        res.status(200).json({
            message: "Updated Successfully",
        })
        return
    } catch (error) {
        
        res.status(400).json({
            message: "Can't Update"
        })
    }
})

clinicRoutes.delete('/:id', authorize, async (req:Request, res:Response) => {
    try {
        const clinicId = req.params.id; 

        const deleteClinic = await Clinic.deleteOne({_id: clinicId})

        if (!deleteClinic) {
            res.status(404).json({
                message: "Clinic not found"
            })
        }

        res.status(200).json({
            message: "Deleted Successfully"
        })
    } catch (error) {
        res.status(400).json({
            message: "Can't delete"
        })
    }
})