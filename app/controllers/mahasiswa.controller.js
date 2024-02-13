const db = require("../models");
const Mahasiswa = db.mahasiswa;
const { success, error, validation } = require("../api/responseHandler");

exports.create = (req, res) => {

    req.body.tanggal_lahir = new Date(req.body.tanggal_lahir)
    
    Mahasiswa.create(req.body)
        .then(data => res.status(200).json(success("success", req.body, res.statusCode)))
        .catch(err => res.status(500).json(error("error", res.statusCode)));
}

exports.findAll = (req, res) => {
    
    Mahasiswa.find()
        .then(data => res.status(200).json(success("success", data, res.statusCode)))
        .catch(err => res.status(500).json(error("error", res.statusCode)));
}

exports.findOne = (req, res) => {
    const id = req.params.id;

    Mahasiswa.findById(id)
    .then(data => res.status(200).json(success("success", data, res.statusCode)))
    .catch(err => res.status(500).json(error("error", res.statusCode)));
}

exports.update = (req, res) => {

    const id = req.params.id;
    req.body.tanggal_lahir = new Date(req.body.tanggal_lahir)
    
    Mahasiswa.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
            .then(data => {
                if(!data) {
                    res.status(404).send({message: "cannot update."})
                }
                res.status(200).json(success("success", req.body, res.statusCode))
            })
            .catch(err => res.status(500).send({message: err.message}))
}

exports.delete = (req, res) => {

    const id = req.params.id;

    Mahasiswa.findByIdAndRemove(id)
        .then(data => {
            if(!data){
                res.status(404).send({message: "Cannot remove"})
            }
            res.send({message: "Success"})
        })
        .catch(err => res.status(500).send({message: err.message}))
}