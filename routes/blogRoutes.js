
const blogModel = require("../model/blog.model");
const { Router } = require("express");
const blogroutes = Router();

blogroutes.get("/", async(req,res) => {
    try {
        const data = await blogModel.find();
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})


blogroutes.post("/blogs", async (req, res) => {
  try {
    const data = await new blogModel(req.body);
    await data.save();
    res.status(200).json({ msg: "Blog Posted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


blogroutes.patch("/blogs/:id", async(req,res) => {
    const {id} = req.params;
    try {
        await blogModel.findByIdAndUpdate({_id: id}, req.body)
        res.status(200).json({msg: "Blog Updated"})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

blogroutes.delete("/blogs/:id", async(req,res) => {
    const {id} = req.params;
    try {
        await blogModel.findByIdAndDelete({_id: id}, req.body)
        res.status(200).json({msg: "Blog deleted"})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

blogroutes.patch("/blogs/:id/like", async(req,res) => {
    const {id} = req.params;
    try {
        await blogModel.findByIdAndUpdate({_id: id}, req.body)
        res.status(200).json({msg: "Blog Updated"})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

blogroutes.patch("/blogs/:id/comment", async(req,res) => {
    const {id} = req.params;
    try {
        await blogModel.findByIdAndUpdate({_id: id}, req.body)
        res.status(200).json({msg: "Blog Updated"})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

module.exports = blogroutes


// blogroutes.get("/", async (req, res) => {
//   try {
//     const sortBy = req.query.sortBy;
//     const sortOrder = req.query.sortOrder === "asc" ? 1 : -1;

//     const filters = {};
//     if (req.query.category) {
//       filters.category = req.query.category;
//     }

//     if (req.query.search) {
//       filters.title = { $regex: req.query.search, $options: "i" };
//     }

//     const totalblogs = await blogModel.countDocument(filters)

//     const data = await blogModel.find(filters)
//         .sort({[sortBy]: sortOrder})

//         res.status(200).json({
//             data
//         })
//   } catch (error) {
//     res.status(400).json({error: error.message})
//   }
// });