const express = require("express");
const router = express.Router();

const Actions = require("./data/helpers/actionModel");

router.get("/", (req, res) => {
  Actions.get()
    .then(project => {
      res.status(200).json(project);
    })
    .catch(err => {
      res.json(400).json({ message: "error retrieving projects" });
    });
});

router.get("/:id", (req, res) => {
  Actions.get(req.params.id)

    .then(project => {
      if (project) {
        res.status(200).json(project);
      } else {
        res.status(400).json({ message: "this action does not exist" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "error retrieving action" });
    });
});

router.post("/", (req, res) => {
  const newP = req.body;
  Actions.insert(newP)
    .then(action => {
      res.status(200).json(action);
    })
    .catch(err => {
      res.status(400).json({
        message:
          "error posting an action ,type in a note,project_id and description"
      });
    });
});

router.delete("/:id", (req, res) => {
  Actions.get(req.params.id)
    .then(result => {
      if (result == undefined) {
        res.status(404).json({ message: "this action does not exist" });
      } else {
        res.status(200).json(result);
      }
    })
    .catch(err => {
      res.status(500).json({ message: "could not proceed" });
    });
});

router.put("/:id", (req, res) => {
  if (
    !req.body ||
    !req.body.notes ||
    !req.body.description ||
    !req.body.project_id
  ) {
    console.log("nah");
    res.status(500).json({
      message:
        "type in a name and a description,a note and a project_id for the action"
    });
    return;
  }

  Actions.get(req.params.id)

    .then(result => {
      if (result) {
        console.log(result.id);
        Actions.update(req.params.id, req.body);
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

// Actions : project id, description , notes

// /:id   //:id/projects
module.exports = router;
