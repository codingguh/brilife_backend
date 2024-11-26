import Agen from "../models/AgenModel.js";
import path from "path";
import fs from "fs";

export const getAgens = async (req, res) => {
  try {
    const response = await Agen.findAll();
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getAgenById = async (req, res) => {
  try {
    const response = await Agen.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const saveAgen = async (req, res) => {
  const { no_lisensi,nama_agen,id_agen_level,status,status_tgl,wilayah_kerja } = req.body; // Ensure `req.body` has all the required fields
  // Ensure `req.body` has all the required fields
  try {
      const newAgen = await Agen.create({ no_lisensi,nama_agen,id_agen_level,status,status_tgl,wilayah_kerja });
      res.status(201).json({ 
          message: "Agen created successfully",
          data: newAgen, // Optionally return the created object
      });
  } catch (error) {
      console.error("Error creating Agen:", error.message);
      res.status(500).json({ 
          message: "Failed to create level",
          error: error.message, // Provide error details in the response
      });
  }
};


export const updateAgen = async(req, res)=>{
    const Agen = await Agen.findOne({
        where:{
            id : req.params.id
        }
    });
    if(!Agen) return res.status(404).json({msg: "No Data Found"});
    
    let fileName = "";
    if(req.files === null){
        fileName = Agen.image;
    }else{
        const file = req.files.file;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        fileName = file.md5 + ext;
        const allowedType = ['.png','.jpg','.jpeg'];

        if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: "Invalid Images"});
        if(fileSize > 5000000) return res.status(422).json({msg: "Image must be less than 5 MB"});

        const filepath = `./public/images/${Agen.image}`;
        fs.unlinkSync(filepath);

        file.mv(`./public/images/${fileName}`, (err)=>{
            if(err) return res.status(500).json({msg: err.message});
        });
    }
    const name = req.body.title;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    
    try {
        await Agen.update({name: name, image: fileName, url: url},{
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Agen Updated Successfuly"});
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteAgen = async (req, res) => {
  try {
    const Agen = await Agen.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!Agen) return res.status(404).json({ msg: "No data found" });
    try {
      const filePath = `./public/images/${Agen.image}`;
      fs.unlinkSync(filePath);
      await Agen.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json({ msg: "Agen deleted successfully" });
    } catch (error) {}
  } catch (error) {
    console.log(error.message);
  }
};
