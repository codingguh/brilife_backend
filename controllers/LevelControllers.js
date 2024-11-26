import Level from "../models/LevelModel.js";
import path from "path";
import fs from "fs";

export const getLevels = async (req, res) => {
  try {
    const response = await Level.findAll();
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getLevelById = async (req, res) => {
  try {
    const response = await Level.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const saveLevel = async (req, res) => {
  const { level, urutan, keterangan } = req.body; // Ensure `req.body` has all the required fields
  try {
      const newLevel = await Level.create({ level, urutan, keterangan });
      res.status(201).json({ 
          message: "Level created successfully",
          data: newLevel, // Optionally return the created object
      });
  } catch (error) {
      console.error("Error creating Level:", error.message);
      res.status(500).json({ 
          message: "Failed to create level",
          error: error.message, // Provide error details in the response
      });
  }
};


export const updateLevel = async(req, res)=>{
    const Level = await Level.findOne({
        where:{
            id : req.params.id
        }
    });
    if(!Level) return res.status(404).json({msg: "No Data Found"});
    
    let fileName = "";
    if(req.files === null){
        fileName = Level.image;
    }else{
        const file = req.files.file;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        fileName = file.md5 + ext;
        const allowedType = ['.png','.jpg','.jpeg'];

        if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: "Invalid Images"});
        if(fileSize > 5000000) return res.status(422).json({msg: "Image must be less than 5 MB"});

        const filepath = `./public/images/${Level.image}`;
        fs.unlinkSync(filepath);

        file.mv(`./public/images/${fileName}`, (err)=>{
            if(err) return res.status(500).json({msg: err.message});
        });
    }
    const name = req.body.title;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    
    try {
        await Level.update({name: name, image: fileName, url: url},{
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Level Updated Successfuly"});
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteLevel = async (req, res) => {
  try {
    const Level = await Level.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!Level) return res.status(404).json({ msg: "No data found" });
    try {
      const filePath = `./public/images/${Level.image}`;
      fs.unlinkSync(filePath);
      await Level.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json({ msg: "Level deleted successfully" });
    } catch (error) {}
  } catch (error) {
    console.log(error.message);
  }
};
