const router = require('express').Router();
const BlogPost = require('./schema');

/*const getHandler = getEntity(entity);
router.get( '/', getHandler);*/
router.get("/", async (req, res) => {
    try {
      let { query } = req;
      for(let keys of Object.keys(query)) {
        query[keys] = { $regex: query[keys] };
      }
      const blogPost = await BlogPost.find(query);
      return res.status(200).json(blogPost);
    } catch (error) {
      console.log({ error });
      return res.status(500).json({ mensaje: error.message });
    }
});

 // const getOneHandler = getOneEntity(entity);
router.get('/:_id', async (req, res) => {
  try {
    const { _id } = req.params;
    const onePost = await BlogPost.findById(_id);
    if (onePost) {
      return res.status(200).json(onePost);
    }
    return res.status(404).json({ mensaje: "mascota no encontrada" });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ mensaje: error.message });
  }
});  

/*const postHandler = postEntity(entity);
router.post('/', postHandler);*/
router.post("/", async (req, res)=>{
    try {
      const blogPost = new BlogPost(req.body);
      await blogPost.save();
      return res.status(200).json(blogPost);  
    } catch (error) {
      console.log({error});
      return res.status(500).json({ mensaje: error.message });
    }
});

/*const putHandler = putEntity(entity);
router.put("/:_id", putHandler);*/
router.put("/:_id", async (req, res) => {
  try {
    const { _id = null } = req.params;
    const {_id: id, ...newDates } = req.body;
    if(!_id) {
      return res.status(400).json({ mensaje: 'falta id' });  
    } 
    const postUpdate = await BlogPost.findOneAndUpdate({_id}, {$set : newDates}, {new:true, runValidators:true});
    return res.status(200).json(postUpdate);
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ mensaje: error.message });
  }
});

/*const deleteHandler = deleteEntity(entity);
router.delete("/:_id", deleteHandler);*/
router.delete("/:_id", async (req, res) => {
  try {
    const { _id = null } = req.params;
    if (!_id) {
      return res.status(400).json({ mensaje: "falta id" });
    }
    const postDelete = await BlogPost.remove({_id});
    console.log({postDelete});
    return res.status(204).send();
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ mensaje: error.message });
  }
});


module.exports = router;