import AgenStruktur from "../models/AgenStrukturModel.js";
import path from "path";
import fs from "fs";

export const getAgenStrukturs = async (req, res) => {
  try {
    const response = await AgenStruktur.findAll();
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getAgenStrukturById = async (req, res) => {
  try {
    const response = await AgenStruktur.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const saveAgenStruktur = async (req, res) => {
  const { parent_id,id_agen,berlaku_mulai,berlaku_akhir,status,keterangan } = req.body; // Ensure `req.body` has all the required fields
  // Ensure `req.body` has all the required fields
  try {
      const newAgenStruktur = await AgenStruktur.create({ parent_id,id_agen,berlaku_mulai,berlaku_akhir,status,keterangan });
      res.status(201).json({ 
          message: "AgenStruktur created successfully",
          data: newAgenStruktur, // Optionally return the created object
      });
  } catch (error) {
      console.error("Error creating AgenStruktur:", error.message);
      res.status(500).json({ 
          message: "Failed to create level",
          error: error.message, // Provide error details in the response
      });
  }
};


export const updateAgenStruktur = async(req, res)=>{
    const AgenStruktur = await AgenStruktur.findOne({
        where:{
            id : req.params.id
        }
    });
    if(!AgenStruktur) return res.status(404).json({msg: "No Data Found"});
    
    let fileName = "";
    if(req.files === null){
        fileName = AgenStruktur.image;
    }else{
        const file = req.files.file;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        fileName = file.md5 + ext;
        const allowedType = ['.png','.jpg','.jpeg'];

        if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: "Invalid Images"});
        if(fileSize > 5000000) return res.status(422).json({msg: "Image must be less than 5 MB"});

        const filepath = `./public/images/${AgenStruktur.image}`;
        fs.unlinkSync(filepath);

        file.mv(`./public/images/${fileName}`, (err)=>{
            if(err) return res.status(500).json({msg: err.message});
        });
    }
    const name = req.body.title;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    
    try {
        await AgenStruktur.update({name: name, image: fileName, url: url},{
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "AgenStruktur Updated Successfuly"});
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteAgenStruktur = async (req, res) => {
  try {
    const AgenStruktur = await AgenStruktur.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!AgenStruktur) return res.status(404).json({ msg: "No data found" });
    try {
      const filePath = `./public/images/${AgenStruktur.image}`;
      fs.unlinkSync(filePath);
      await AgenStruktur.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json({ msg: "AgenStruktur deleted successfully" });
    } catch (error) {}
  } catch (error) {
    console.log(error.message);
  }
};
