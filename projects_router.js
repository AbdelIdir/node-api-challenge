const express = require("express");
const router = express.Router();

const Projects = require("./data/helpers/projectModel");

router.get("/", (req, res) => {
  Projects.get()
    .then(project => {
      res.status(200).json(project);
    })
    .catch(err => {
      res.json(400).json({ message: "error retrieving projects" });
    });
});

router.get("/list/:id", (req, res) => {
  Projects.getProjectActions(req.params.id)

    .then(project => {
      if (project.project_id) {
        res.status(200).json(project);
      } else {
        res.status(400).json({ message: "this project does not exist" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "error retrieving projects" });
    });
});

router.get("/:id", (req, res) => {
  Projects.get(req.params.id)

    .then(project => {
      if (project) {
        res.status(200).json(project);
      } else {
        res.status(400).json({ message: "this project does not exist" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "error retrieving projects" });
    });
});

router.post("/", (req, res) => {
  const newP = req.body;
  Projects.insert(newP)
    .then(project => {
      res.status(200).json(project);
    })
    .catch(err => {
      res.status(400).json({
        message: "error posting a project,type in a name and description"
      });
    });
});

router.delete("/:id", (req, res) => {
  Projects.get(req.params.id)
    .then(result => {
      if (result == undefined) {
        res.status(500).json({ message: "this project does not exist" });
      } else {
        res.status(200).json(result);
      }
    })
    .catch(err => {
      res.status(500).json({ message: "could not proceed" });
    });
});
router.put("/:id", (req, res) => {
  if (!req.body || !req.body.name || !req.body.description) {
    console.log("nah");
    res.status(500).json({
      message: "type in a name and a description for the project"
    });
    return;
  }

  Projects.get(req.params.id)

    .then(result => {
      if (result) {
        console.log(result.id);
        Projects.update(req.params.id, req.body);
        res.status(201).json(req.body);
      } else {
        res.status(404).json({
          message: "could not find this project,this project id does not exist"
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        message: "something went wrong trying to update this project"
      });
    });
});

module.exports = router;
